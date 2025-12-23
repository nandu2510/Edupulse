
import React, { useState } from 'react';
import { Clock, MapPin, Video, User, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { MOCK_SCHEDULE } from '../constants';
import { UserRole } from '../types';

interface ScheduleProps {
  userRole: UserRole;
}

const Schedule: React.FC<ScheduleProps> = ({ userRole }) => {
  const [view, setView] = useState<'Week' | 'Month'>('Week');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Faculty Filter: Show only "Dr. Sarah Chen" sessions if role is Faculty
  const filteredSchedule = userRole === UserRole.FACULTY 
    ? MOCK_SCHEDULE.filter(s => s.instructor === 'Dr. Sarah Chen')
    : MOCK_SCHEDULE;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Matrix</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">
            {userRole === UserRole.FACULTY ? 'Managing your current semester teaching blocks.' : 'Your personalized weekly academic trajectory.'}
          </p>
        </div>
        <div className="glass p-2 rounded-[2rem] flex gap-2 shadow-sm border border-white">
          {['Week', 'Month'].map(v => (
            <button 
              key={v} 
              onClick={() => setView(v as any)}
              className={`px-8 py-3.5 text-xs font-black uppercase tracking-widest rounded-[1.5rem] transition-all ${
                view === v ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'Week' ? (
        <div className="grid grid-cols-1 gap-12">
          {days.map(day => {
            const sessions = filteredSchedule.filter(s => s.day === day);
            if (sessions.length === 0) return null;

            return (
              <section key={day} className="space-y-6">
                <div className="flex items-center gap-4 pl-4">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{day}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sessions.map(session => (
                    <div key={session.id} className="glass p-8 rounded-[3rem] border border-white shadow-xl hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                         <CalendarIcon size={64} />
                      </div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-100">
                          <Clock size={24} />
                        </div>
                        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">{session.time}</span>
                      </div>
                      <h4 className="font-black text-2xl text-slate-900 mb-2 leading-none group-hover:text-indigo-600 transition-colors tracking-tight">{session.subject}</h4>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 mb-8">
                        <User size={14} className="text-slate-300" /> {session.instructor}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm border ${
                          session.link ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                          {session.link ? <Video size={14} /> : <MapPin size={14} />}
                          {session.room}
                        </div>
                        {session.link && (
                          <a href={session.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">
                            Enter Hub <Sparkles size={12}/>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="glass p-12 rounded-[4rem] border border-white shadow-2xl animate-in fade-in duration-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
           <div className="grid grid-cols-7 gap-1 mb-8">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="bg-slate-900 text-white p-4 text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl">{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="bg-white/50 backdrop-blur-md h-32 p-4 rounded-2xl border border-white/50 relative group hover:bg-white transition-all">
                   <span className="text-sm font-black text-slate-300 group-hover:text-slate-900">{i + 1}</span>
                   {(i % 7 === 1 || i % 7 === 4) && (
                     <div className="mt-2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-xl truncate shadow-lg">2 Sessions</div>
                   )}
                </div>
              ))}
           </div>
           <div className="text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-6 py-2 rounded-full">Monthly data synchronized with VITB-Central Engine</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
