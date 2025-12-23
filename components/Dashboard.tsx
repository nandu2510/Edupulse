
import React, { useState } from 'react';
import { 
  Bell, 
  Clock, 
  TrendingUp, 
  CalendarDays, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Target,
  X,
  Map as MapIcon
} from 'lucide-react';
import { 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis 
} from 'recharts';
import { MOCK_PERFORMANCE, MOCK_SCHEDULE } from '../constants';
import { Priority, Task, Announcement } from '../types';

interface DashboardProps {
  onDigestClick: () => void;
  tasks: Task[];
  announcements: Announcement[];
}

const Dashboard: React.FC<DashboardProps> = ({ onDigestClick, tasks, announcements }) => {
  const [showCourseMap, setShowCourseMap] = useState(false);
  const urgentCount = announcements.filter(a => a.priority === Priority.URGENT).length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] -ml-24 -mb-24"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full text-indigo-300 text-xs font-black uppercase tracking-widest border border-indigo-500/30">
              <Sparkles size={14} /> Academic Pulse Active
            </div>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
              Maximize your <span className="text-indigo-400">potential,</span> Alex.
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">
              Your institutional engine is running smoothly. You have <span className="text-indigo-400 font-bold">{urgentCount} urgent briefs</span> today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onDigestClick}
                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-5 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-indigo-600/20 group"
              >
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                Institutional Briefing
              </button>
              <button 
                onClick={() => setShowCourseMap(true)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-5 rounded-[2rem] font-black text-lg transition-all border border-white/10"
              >
                Course Map
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center space-y-2 card-hover">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                <Target size={24} />
              </div>
              <div className="text-4xl lg:text-5xl font-black tracking-tighter">85%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center space-y-2 card-hover">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                <TrendingUp size={24} />
              </div>
              <div className="text-4xl lg:text-5xl font-black tracking-tighter">8.42</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current CGPA</div>
            </div>
          </div>
        </div>
      </div>

      {showCourseMap && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 duration-500 border border-white overflow-hidden relative">
            <button onClick={() => setShowCourseMap(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
              <X size={32}/>
            </button>
            <div className="flex items-center gap-4 mb-8">
               <div className="p-4 bg-indigo-600 text-white rounded-3xl">
                  <MapIcon size={24} />
               </div>
               <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Semester Course Map</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Academic Pathway 2024-25</p>
               </div>
            </div>
            <div className="space-y-4">
              {['Data Structures', 'Operating Systems', 'Cloud Computing', 'ML Fundamentals', 'Soft Skills'].map((course, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">{idx + 1}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{course}</h4>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schedule Module */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass rounded-[3rem] p-10 border border-white shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
               <CalendarDays size={48} className="text-indigo-500/5" />
            </div>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-lg shadow-indigo-100">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Today's Hub</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Monday, Sept 20</p>
                </div>
              </div>
              <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><ArrowUpRight size={24}/></button>
            </div>
            <div className="space-y-6">
              {MOCK_SCHEDULE.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center gap-8 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-indigo-50">
                  <div className="w-20 text-right">
                    <div className="text-lg font-black text-slate-900 leading-none">{session.time.split(' - ')[0]}</div>
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mt-1">Start</div>
                  </div>
                  <div className="w-2 h-16 bg-slate-100 rounded-full group-hover:bg-indigo-600 transition-all"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{session.subject}</h4>
                      {session.link && (
                        <a href={session.link} target="_blank" className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase border border-emerald-100">
                          Live Room <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm font-bold text-slate-500 flex items-center gap-2">
                        <MapPinIcon size={16} className="text-slate-300" /> {session.room}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">{session.instructor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass rounded-[3rem] p-10 border border-white shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-emerald-500 text-white rounded-3xl shadow-lg shadow-emerald-100">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Growth Map</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Metrics</p>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_PERFORMANCE}>
                  <defs>
                    <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '16px' }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorMain)" dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass rounded-[3rem] p-10 border border-white shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                  <AlertCircle size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Deadlines</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-xs font-black text-rose-600">
                {pendingTasks.length}
              </div>
            </div>
            <div className="space-y-4">
              {pendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-6 rounded-3xl border border-slate-50 bg-white/40 hover:bg-white transition-all card-hover group">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border shadow-sm ${
                      task.category === 'Exam' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {task.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors leading-tight">{task.title}</h4>
                  <div className="flex items-center gap-2 mt-4 text-xs font-bold text-slate-400">
                    <CalendarDays size={14} />
                    OCTOBER {task.dueDate.split('-')[2]}
                  </div>
                </div>
              ))}
              {pendingTasks.length === 0 && <p className="text-center text-xs font-bold text-slate-300 py-10 tracking-widest uppercase">Cleared for launch</p>}
            </div>
          </section>

          <section className="glass rounded-[3rem] p-10 border border-white shadow-sm relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                  <Bell size={22} />
                </div>
                <h3 className="text-xl font-black tracking-tight">Pulse Feed</h3>
              </div>
              <div className="space-y-6">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="relative pl-6 border-l-2 border-white/20 group cursor-pointer">
                    <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ring-4 ring-indigo-900/20 group-hover:scale-125 transition-transform ${
                      ann.priority === Priority.URGENT ? 'bg-rose-400' : 'bg-white'
                    }`}></div>
                    <h4 className="text-sm font-black group-hover:text-indigo-200 transition-colors">{ann.title}</h4>
                    <p className="text-[10px] text-white/60 mt-1 line-clamp-1 leading-relaxed font-bold uppercase tracking-wider">{ann.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const MapPinIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default Dashboard;
