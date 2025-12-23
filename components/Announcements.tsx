
import React, { useState } from 'react';
import { Megaphone, Calendar, User, Clock, CalendarPlus, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Priority, Announcement, Task } from '../types';

interface AnnouncementsProps {
  announcements: Announcement[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  // Prop to distinguish between student and faculty view
  isFaculty?: boolean;
}

const Announcements: React.FC<AnnouncementsProps> = ({ announcements, onAddTask, isFaculty }) => {
  const [extractingId, setExtractingId] = useState<string | null>(null);
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set());

  const handleSync = (ann: Announcement) => {
    setExtractingId(ann.id);
    // Simulation of processing instead of AI
    setTimeout(() => {
      onAddTask({
        title: `Reminder: ${ann.title}`,
        dueDate: ann.deadline || ann.date,
        category: 'Assignment',
        status: 'Pending'
      });
      setSyncedIds(prev => new Set([...prev, ann.id]));
      setExtractingId(null);
    }, 800);
  };

  const getPriorityTheme = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT: return { 
        bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', dot: 'bg-rose-500', accent: 'bg-rose-500' 
      };
      case Priority.ACADEMIC: return { 
        bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', dot: 'bg-indigo-500', accent: 'bg-indigo-500' 
      };
      case Priority.EVENT: return { 
        bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', dot: 'bg-purple-500', accent: 'bg-purple-500' 
      };
      default: return { 
        bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-500', accent: 'bg-slate-300' 
      };
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Campus Ledger</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Authenticated academic and institutional intelligence.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Filter Stream</span>
          <select className="glass border border-white rounded-[1.5rem] px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none shadow-sm cursor-pointer">
            <option>All Intelligence</option>
            <option>Critical Only</option>
            <option>Academic Feed</option>
            <option>Events Stream</option>
          </select>
        </div>
      </div>

      <div className="space-y-10 relative">
        <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-px bg-slate-200 hidden lg:block"></div>
        
        {announcements.map((ann, index) => {
          const theme = getPriorityTheme(ann.priority);
          return (
            <div key={ann.id} className={`flex flex-col lg:flex-row items-start gap-12 relative ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Timeline Marker */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-10 hidden lg:flex items-center justify-center z-10">
                <div className={`w-4 h-4 rounded-full border-4 border-white shadow-xl ${theme.dot}`}></div>
              </div>

              <div className="w-full lg:w-[calc(50%-48px)]">
                <div className="glass rounded-[3rem] border border-white shadow-xl card-hover overflow-hidden group">
                  <div className={`h-2 w-full ${theme.accent}`}></div>
                  <div className="p-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${theme.bg} ${theme.text} ${theme.border}`}>
                        {ann.priority}
                      </span>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2"><User size={14} className="text-indigo-400" /> {ann.postedBy}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-slate-300" /> {ann.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-10 font-medium text-lg">{ann.content}</p>

                    <div className="flex flex-wrap items-center justify-between pt-8 border-t border-slate-100 gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Target Deadline</span>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <Calendar size={16} className="text-indigo-400" />
                          {ann.deadline || 'No specific date'}
                        </div>
                      </div>
                      
                      {/* Hide sync button for faculty as they are the ones issuing the announcement */}
                      {!isFaculty && (
                        <button
                          onClick={() => handleSync(ann)}
                          disabled={extractingId === ann.id || syncedIds.has(ann.id)}
                          className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-black transition-all shadow-xl active:scale-95 ${
                            syncedIds.has(ann.id)
                              ? 'bg-emerald-500 text-white shadow-emerald-200'
                              : 'bg-slate-900 text-white hover:bg-indigo-600 disabled:opacity-70 shadow-slate-200'
                          }`}
                        >
                          {extractingId === ann.id ? (
                            <><Loader2 size={18} className="animate-spin" /> Syncing...</>
                          ) : syncedIds.has(ann.id) ? (
                            <><CheckCircle2 size={18} /> Synced to Hub</>
                          ) : (
                            <><CalendarPlus size={18} /> Sync Deadline</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
