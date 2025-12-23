
import React, { useState } from 'react';
import { Sparkles, Megaphone, Users, Plus, Calendar, ArrowUpRight, TrendingUp, X, CheckCircle, Video, UsersRound } from 'lucide-react';
import { Announcement, Priority } from '../types';

interface FacultyDashboardProps {
  announcements: Announcement[];
  onAddAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
  tasks: any[];
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ announcements, onAddAnnouncement }) => {
  const [showForm, setShowForm] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [newAnn, setNewAnn] = useState({ title: '', content: '', priority: Priority.GENERAL, deadline: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnouncement({
      ...newAnn,
      postedBy: 'Dr. Sarah Chen',
      date: new Date().toISOString().split('T')[0],
      isRead: false
    });
    setNewAnn({ title: '', content: '', priority: Priority.GENERAL, deadline: '' });
    setShowForm(false);
  };

  const handleStartSession = () => {
    setIsSessionActive(true);
    setShowSessionModal(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="relative overflow-hidden bg-slate-900 rounded-[4rem] p-12 lg:p-16 text-white shadow-[0_32px_128px_rgba(0,0,0,0.3)] border border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/20 shadow-xl">
              <Sparkles size={14} className="animate-pulse" /> Faculty Mission Node Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] overflow-visible">
              Command Center, <br /><span className="text-emerald-400">Dr. Sarah Chen.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-lg leading-relaxed">
              Managing 120 students across 4 active courses. Your batch engagement is <span className="text-emerald-400 font-bold">trending up 12%</span> this semester.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-4 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-6 rounded-[2.5rem] font-black text-xl transition-all shadow-2xl shadow-emerald-600/30 group active:scale-95"
              >
                <Plus size={28} className="group-hover:rotate-90 transition-transform" />
                Dispatch Alert
              </button>
              <button 
                onClick={handleStartSession}
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white px-10 py-6 rounded-[2.5rem] font-black text-xl transition-all border border-white/10 active:scale-95"
              >
                <Video size={28} /> Start Session
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 text-center space-y-4 card-hover shadow-2xl">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-[1.5rem] flex items-center justify-center mx-auto text-indigo-400"><Users size={32} /></div>
              <div className="text-5xl lg:text-6xl font-black tracking-tighter">120</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Enrollment</div>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 text-center space-y-4 card-hover shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-[1.5rem] flex items-center justify-center mx-auto text-emerald-400"><TrendingUp size={32} /></div>
              <div className="text-5xl lg:text-6xl font-black tracking-tighter">78%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Presence</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <section className="lg:col-span-2 glass rounded-[3rem] p-10 border border-white shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-5">
                  <div className="p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-indigo-100"><Megaphone size={28} /></div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Platform Dispatches</h3>
               </div>
               <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><ArrowUpRight size={28}/></button>
            </div>
            <div className="space-y-6">
               {announcements.slice(0, 5).map(ann => (
                  <div key={ann.id} className="p-8 rounded-[2.5rem] bg-white border border-slate-50 hover:border-indigo-100 transition-all flex items-center justify-between group shadow-sm hover:shadow-xl">
                     <div className="flex items-center gap-6">
                        <div className={`w-3 h-3 rounded-full ${ann.priority === Priority.URGENT ? 'bg-rose-500 animate-pulse' : 'bg-slate-200'}`}></div>
                        <div>
                           <h4 className="font-extrabold text-slate-800 text-xl tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{ann.title}</h4>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-3">{ann.date} • {ann.postedBy}</p>
                        </div>
                     </div>
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border shadow-sm ${
                        ann.priority === Priority.URGENT ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                     }`}>
                        {ann.priority}
                     </span>
                  </div>
               ))}
            </div>
         </section>

         <div className="space-y-10">
            <section className="glass rounded-[3rem] p-10 border border-white shadow-sm flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
               <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-lg"><Calendar size={48} /></div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Next Engagement</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Machine Learning • LT-402</p>
                  <p className="text-3xl font-black text-indigo-600 tracking-tighter pt-2">10:45 AM</p>
               </div>
               <button onClick={handleStartSession} className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-2xl active:scale-95">Go Live</button>
            </section>
            
            <section className="glass rounded-[3rem] p-10 border border-white shadow-sm bg-indigo-600 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <h3 className="text-xl font-black tracking-tight mb-6">Institutional Compliance</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-80">
                     <span>Grade Submission</span>
                     <span>92%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-white w-[92%]"></div>
                  </div>
                  <p className="text-[10px] font-medium opacity-60 mt-2">Verified by Registrar Node</p>
               </div>
            </section>
         </div>
      </div>

      {showSessionModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xl animate-in fade-in">
           <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl p-12 border border-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 animate-pulse"></div>
              <button onClick={() => setShowSessionModal(false)} className="absolute top-8 right-8 p-3 hover:bg-slate-50 rounded-2xl"><X size={32}/></button>
              
              <div className="flex items-center gap-8 mb-12">
                 <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center animate-bounce shadow-xl">
                   <Video size={48} />
                 </div>
                 <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Session Active: ML-402</h3>
                    <p className="text-emerald-500 font-black uppercase tracking-widest text-xs mt-2 flex items-center gap-2">
                       <Sparkles size={16}/> Synchronized with Institutional Node
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] text-center border border-slate-100">
                    <div className="text-4xl font-black text-slate-900 tracking-tighter">108/120</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Attendance Sync</div>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] text-center border border-slate-100">
                    <div className="text-4xl font-black text-slate-900 tracking-tighter">94%</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Batch Focus</div>
                 </div>
                 <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-center text-white shadow-xl shadow-indigo-100">
                    <div className="text-4xl font-black tracking-tighter">00:45:22</div>
                    <div className="text-[10px] font-black opacity-60 uppercase tracking-widest mt-2">Elapsed Time</div>
                 </div>
              </div>

              <div className="flex gap-6">
                 <button className="flex-1 bg-slate-900 hover:bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl transition-all shadow-2xl shadow-slate-200">Broadcast Material</button>
                 <button onClick={() => setShowSessionModal(false)} className="px-12 bg-rose-500 hover:bg-rose-600 text-white py-6 rounded-[2.5rem] font-black text-xl transition-all shadow-2xl shadow-rose-200">End Session</button>
              </div>
           </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
           <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-[4rem] shadow-2xl p-12 border border-white space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Dispatch <br /><span className="text-emerald-500">Alert</span></h3>
                 <button type="button" onClick={() => setShowForm(false)} className="text-slate-300 hover:text-slate-900"><X size={32}/></button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Announcement Label</label>
                    <input 
                      type="text" required
                      value={newAnn.title}
                      onChange={e => setNewAnn({...newAnn, title: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-800"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Detailed Payload</label>
                    <textarea 
                      required rows={4}
                      value={newAnn.content}
                      onChange={e => setNewAnn({...newAnn, content: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-800"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Priority Node</label>
                      <select 
                        value={newAnn.priority}
                        onChange={e => setNewAnn({...newAnn, priority: e.target.value as Priority})}
                        className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-4 focus:ring-emerald-100 outline-none font-black text-emerald-600"
                      >
                         {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Target Date</label>
                      <input 
                        type="date"
                        value={newAnn.deadline}
                        onChange={e => setNewAnn({...newAnn, deadline: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-3xl px-8 py-6 focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-slate-800"
                      />
                   </div>
                 </div>
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-emerald-100 transition-all active:scale-95">Push to Faculty Node</button>
           </form>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
