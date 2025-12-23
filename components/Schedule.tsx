
import React, { useState } from 'react';
import { Clock, MapPin, Video, User } from 'lucide-react';
import { MOCK_SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  const [view, setView] = useState<'Week' | 'Month'>('Week');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Class Timetable</h2>
          <p className="text-slate-500 text-sm">Your weekly academic schedule and classroom details.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-1 flex gap-1 shadow-sm">
          {['Week', 'Month'].map(v => (
            <button 
              key={v} 
              onClick={() => setView(v as any)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                view === v ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'Week' ? (
        <div className="grid grid-cols-1 gap-8">
          {days.map(day => {
            const sessions = MOCK_SCHEDULE.filter(s => s.day === day);
            if (sessions.length === 0) return null;

            return (
              <section key={day} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-2">{day}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sessions.map(session => (
                    <div key={session.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Clock size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-400">{session.time}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-1">{session.subject}</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-2 mb-4">
                        <User size={14} /> {session.instructor}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full">
                          {session.link ? <Video size={14} className="text-blue-500" /> : <MapPin size={14} className="text-slate-400" />}
                          {session.room}
                        </div>
                        {session.link && (
                          <a href={session.link} target="_blank" rel="noreferrer" className="text-blue-600 text-xs font-bold hover:underline">
                            Join Session
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
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-500">
           <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="bg-slate-50 p-3 text-center text-xs font-bold text-slate-400 uppercase">{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="bg-white h-24 p-2 relative">
                   <span className="text-xs font-bold text-slate-300">{i + 1}</span>
                   {(i % 7 === 1 || i % 7 === 3) && (
                     <div className="mt-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded truncate">2 Classes</div>
                   )}
                </div>
              ))}
           </div>
           <p className="text-center text-xs text-slate-400 mt-6">Monthly view is in read-only synchronized mode with institutional Google Calendar.</p>
        </div>
      )}
    </div>
  );
};

export default Schedule;
