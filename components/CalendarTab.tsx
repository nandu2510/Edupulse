
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles, Target, Plus, X } from 'lucide-react';
import { Task, CampusEvent } from '../types';

interface CalendarTabProps {
  tasks: Task[];
  events: CampusEvent[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setEvents: React.Dispatch<React.SetStateAction<CampusEvent[]>>;
}

const CalendarTab: React.FC<CalendarTabProps> = ({ tasks, events, setTasks, setEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', type: 'task' as 'task' | 'event', date: '', category: 'Assignment' });
  
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

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntry.type === 'task') {
      const newTask: Task = {
        id: `t-${Date.now()}`,
        title: newEntry.title,
        dueDate: newEntry.date,
        status: 'Pending',
        category: newEntry.category as any
      };
      setTasks(prev => [newTask, ...prev]);
    } else {
      const newEv: CampusEvent = {
        id: `e-${Date.now()}`,
        title: newEntry.title,
        date: newEntry.date,
        organizer: 'Institutional Calendar',
        time: 'TBD',
        location: 'TBD',
        registered: false,
        description: 'Manually added calendar event.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80'
      };
      setEvents(prev => [newEv, ...prev]);
    }
    setShowAddModal(false);
    setNewEntry({ title: '', type: 'task', date: '', category: 'Assignment' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-indigo-100 shadow-xl shadow-indigo-100/20">
            <Sparkles size={14} className="animate-pulse" /> Unified Chronos Node
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Institutional Calendar</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Centralized synchronization of mission deadlines and social hubs.</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2.5rem] font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center gap-3"
          >
            <Plus size={24} /> Add to Schedule
          </button>
          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-xl">
            <button onClick={prevMonth} className="p-3 hover:bg-slate-50 rounded-2xl transition-all"><ChevronLeft size={24}/></button>
            <div className="px-8 font-black text-2xl text-slate-900 min-w-[240px] text-center tracking-tighter">{monthNames[month]} {year}</div>
            <button onClick={nextMonth} className="p-3 hover:bg-slate-50 rounded-2xl transition-all"><ChevronRight size={24}/></button>
          </div>
        </div>
      </div>

      <div className="glass rounded-[4rem] border border-white shadow-[0_32px_128px_rgba(0,0,0,0.1)] overflow-hidden relative">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-900 text-white/50 text-[10px] font-black uppercase tracking-[0.4em] p-6 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {Array.from({ length: 42 }).map((_, i) => {
            const dayNum = i - startOffset + 1;
            const isCurrentMonth = dayNum > 0 && dayNum <= totalDays;
            const items = isCurrentMonth ? getDayItems(dayNum) : [];
            const isToday = isCurrentMonth && dayNum === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            
            return (
              <div key={i} className={`min-h-[180px] p-6 bg-white/70 backdrop-blur-md group hover:bg-white transition-all ${!isCurrentMonth ? 'bg-slate-50/30 grayscale' : ''}`}>
                {isCurrentMonth && (
                  <>
                    <div className={`text-2xl font-black mb-4 transition-all ${isToday ? 'text-indigo-600 scale-125' : 'text-slate-300 group-hover:text-slate-900'}`}>{dayNum}</div>
                    <div className="space-y-2">
                      {items.map((item: any, idx) => (
                        <div key={idx} className={`px-4 py-2 rounded-2xl text-[10px] font-black truncate transition-all shadow-xl shadow-slate-100 border uppercase tracking-widest ${
                          item.type === 'task' 
                            ? 'bg-rose-50 text-rose-600 border-rose-100' 
                            : 'bg-indigo-600 text-white border-indigo-700'
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

      {showAddModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xl animate-in fade-in">
           <form onSubmit={handleAddSubmit} className="bg-white w-full max-w-lg rounded-[4rem] shadow-2xl p-12 border border-white space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Add to <br /><span className="text-indigo-600">Schedule</span></h3>
                 <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-slate-900"><X size={32}/></button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Label</label>
                    <input 
                      type="text" required placeholder="Project Alpha Submission..."
                      value={newEntry.title}
                      onChange={e => setNewEntry({...newEntry, title: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-6 focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Type</label>
                      <select 
                        value={newEntry.type}
                        onChange={e => setNewEntry({...newEntry, type: e.target.value as any})}
                        className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-6 focus:ring-4 focus:ring-indigo-100 outline-none font-black text-indigo-600"
                      >
                         <option value="task">Deadline</option>
                         <option value="event">Campus Event</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Timeline</label>
                      <input 
                        type="date" required
                        value={newEntry.date}
                        onChange={e => setNewEntry({...newEntry, date: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-6 focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800"
                      />
                   </div>
                 </div>
                 {newEntry.type === 'task' && (
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Classification</label>
                      <select 
                        value={newEntry.category}
                        onChange={e => setNewEntry({...newEntry, category: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-6 focus:ring-4 focus:ring-indigo-100 outline-none font-black text-indigo-600"
                      >
                         <option>Assignment</option>
                         <option>Exam</option>
                         <option>Submission</option>
                      </select>
                   </div>
                 )}
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95">Integrate Node</button>
           </form>
        </div>
      )}
    </div>
  );
};

export default CalendarTab;
