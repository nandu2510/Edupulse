
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatbot: React.FC<{ isFaculty?: boolean }> = ({ isFaculty }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Greetings. I am the EduPulse AI Node. How can I assist with your ${isFaculty ? 'faculty' : 'academic'} operations today?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are EduPulse AI, a helpful and efficient educational assistant for ${isFaculty ? 'faculty' : 'students'}. Provide clear, professional, and institutional-themed responses.`,
        },
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullResponse = '';
      for await (const chunk of result) {
        const textChunk = chunk.text || '';
        fullResponse += textChunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullResponse;
          return updated;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection to the AI Node was interrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-slate-900 text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <MessageSquare size={28} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 border-4 border-white rounded-full"></span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[400px] h-[600px] rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-20 duration-500">
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-black text-lg tracking-tight">AI Node Alpha</h4>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Synchronized
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'model' 
                    ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' 
                    : 'bg-indigo-600 text-white rounded-tr-none'
                }`}>
                  {msg.text || (isLoading && i === messages.length - 1 && <Loader2 size={16} className="animate-spin" />)}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query institutional engine..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all disabled:opacity-50 active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
