
import React from 'react';
import { CheckCircle2, Circle, Calendar, AlertCircle, Filter, Target, Sparkles } from 'lucide-react';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
    ));
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full text-rose-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Target size={12} /> Priority Objectives
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Deadline Tracker</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Manage your academic trajectory and sync mission-critical tasks.</p>
        </div>
        <div className="flex lg:justify-end gap-3">
          <button className="p-4 glass border border-white rounded-[1.5rem] text-slate-600 hover:bg-white transition-all shadow-sm">
            <Filter size={24} />
          </button>
        </div>
      </div>

      <div className="glass p-10 rounded-[3rem] border border-white shadow-sm overflow-hidden relative">
         <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full"></div>
         <div className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
         <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-4">
             <div className="p-4 bg-indigo-600 text-white rounded-3xl">
                <Sparkles size={24} />
             </div>
             <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Mission Progress</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{completedCount} of {tasks.length} objectives met</p>
             </div>
           </div>
           <div className="text-4xl font-black text-indigo-600 tracking-tighter">{Math.round(progress)}%</div>
         </div>
         <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
         </div>
      </div>

      <div className="glass rounded-[3rem] border border-white shadow-xl overflow-hidden">
        <div className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                <CheckCircle2 size={40} />
              </div>
              <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">Workspace Zero reached</p>
            </div>
          ) : tasks.map(task => (
            <div key={task.id} className={`p-10 flex items-center justify-between hover:bg-slate-50/50 transition-all group ${task.status === 'Completed' ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-10">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`transition-all duration-300 transform group-hover:scale-110 ${task.status === 'Completed' ? 'text-emerald-500' : 'text-slate-200 hover:text-indigo-500'}`}
                >
                  {task.status === 'Completed' ? <CheckCircle2 size={42} /> : <Circle size={42} strokeWidth={1.5} />}
                </button>
                <div>
                  <h4 className={`font-black text-2xl transition-all tracking-tight leading-none ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-6 mt-4">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border shadow-sm ${
                      task.category === 'Exam' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {task.category}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar size={14} className="text-slate-300" /> October {task.dueDate.split('-')[2]}
                    </span>
                  </div>
                </div>
              </div>
              {task.status === 'Pending' && (
                <div className="p-4 bg-amber-50 text-amber-500 rounded-[1.5rem] border border-amber-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <AlertCircle size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
