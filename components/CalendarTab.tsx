
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Target } from 'lucide-react';
import { Task, CampusEvent } from '../types';

interface CalendarTabProps {
  tasks: Task[];
  events: CampusEvent[];
}

const CalendarTab: React.FC<CalendarTabProps> = ({ tasks, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month);
  
  const getDayItems = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTasks = tasks.filter(t => t.dueDate === dateString);
    const dayEvents = events.filter(e => e.date === dateString);
    return [...dayTasks.map(t => ({ ...t, type: 'task' })), ...dayEvents.map(e => ({ ...e, type: 'event' }))];
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Institutional Sync
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Campus Calendar</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Unified schedule for deadlines, exams, and campus events.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-[1.5rem] border border-slate-200 shadow-sm">
          <button onClick={prevMonth} className="p-3 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft size={24}/></button>
          <div className="px-6 font-black text-xl text-slate-800 min-w-[200px] text-center">{monthNames[month]} {year}</div>
          <button onClick={nextMonth} className="p-3 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight size={24}/></button>
        </div>
      </div>

      <div className="glass rounded-[3rem] border border-white shadow-xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-900 text-white/50 text-[10px] font-black uppercase tracking-widest p-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {Array.from({ length: 42 }).map((_, i) => {
            const dayNum = i - startOffset + 1;
            const isCurrentMonth = dayNum > 0 && dayNum <= totalDays;
            const items = isCurrentMonth ? getDayItems(dayNum) : [];
            
            return (
              <div key={i} className={`min-h-[160px] p-4 bg-white group hover:bg-indigo-50/20 transition-colors ${!isCurrentMonth ? 'bg-slate-50/50' : ''}`}>
                {isCurrentMonth && (
                  <>
                    <div className={`text-lg font-black mb-2 transition-colors ${dayNum === new Date().getDate() && month === new Date().getMonth() ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-900'}`}>{dayNum}</div>
                    <div className="space-y-1">
                      {items.map((item: any, idx) => (
                        <div key={idx} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold truncate transition-all shadow-sm ${
                          item.type === 'task' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                            : 'bg-indigo-600 text-white'
                        }`}>
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="glass rounded-[2.5rem] p-8 border border-white shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
             <Target className="text-rose-500" /> Key Deadlines This Month
          </h3>
          <div className="space-y-4">
             {tasks.slice(0, 3).map(task => (
               <div key={task.id} className="p-4 bg-white/50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div className="font-bold text-slate-700">{task.title}</div>
                  <div className="text-xs font-black text-rose-500 uppercase tracking-widest">{task.dueDate}</div>
               </div>
             ))}
          </div>
        </section>
        <section className="glass rounded-[2.5rem] p-8 border border-white shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
             <CalendarIcon className="text-indigo-500" /> Major Events
          </h3>
          <div className="space-y-4">
             {events.slice(0, 2).map(event => (
               <div key={event.id} className="p-4 bg-indigo-600 text-white rounded-2xl flex justify-between items-center">
                  <div className="font-bold">{event.title}</div>
                  <div className="text-xs font-black uppercase tracking-widest opacity-80">{event.date}</div>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalendarTab;
