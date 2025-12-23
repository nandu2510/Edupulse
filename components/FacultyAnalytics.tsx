
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Users, Search, ChevronRight, AlertCircle, CheckCircle, User as UserIcon } from 'lucide-react';
import { MOCK_STUDENT_RECORDS } from '../constants';

const FacultyAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENT_RECORDS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Student Insights Node</h2>
          <p className="text-slate-500 font-medium text-lg mt-2 tracking-tight">Real-time batch performance metrics and academic risk monitoring.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all" size={20} />
          <input 
            type="text" 
            placeholder="Search roster..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-16 pr-8 py-5 rounded-[2rem] bg-white border border-slate-200 text-sm w-full md:w-80 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass p-10 rounded-[3rem] border border-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-lg"><CheckCircle size={32} /></div>
            <div>
               <h4 className="text-4xl font-black text-slate-900 tracking-tighter">84%</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Verified Standing</p>
            </div>
         </div>
         <div className="glass p-10 rounded-[3rem] border border-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-[1.5rem] flex items-center justify-center shadow-lg"><AlertCircle size={32} className="animate-pulse" /></div>
            <div>
               <h4 className="text-4xl font-black text-slate-900 tracking-tighter">12</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Critical Absentees</p>
            </div>
         </div>
         <div className="glass p-10 rounded-[3rem] border border-white shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-lg"><TrendingUp size={32} /></div>
            <div>
               <h4 className="text-4xl font-black text-slate-900 tracking-tighter">7.8</h4>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Batch Median CGPA</p>
            </div>
         </div>
      </div>

      <div className="glass rounded-[4rem] border border-white shadow-2xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Institutional Batch Ledger</span>
           <button className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-6 py-2.5 rounded-2xl hover:bg-white/20 transition-all border border-white/5">Export Dataset</button>
        </div>
        <div className="divide-y divide-slate-100">
           {filteredStudents.map(student => (
              <div key={student.id} className="p-10 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-all group gap-8">
                 <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl shadow-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                       <UserIcon size={32} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-2xl tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">{student.name}</h4>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">ID Node: {student.id} • {student.department}</p>
                    </div>
                 </div>

                 <div className="flex flex-wrap items-center gap-12">
                    <div className="w-40">
                       <div className="flex justify-between items-center mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span>Presence</span>
                          <span className={student.attendance < 75 ? 'text-rose-500 font-black' : 'text-emerald-500 font-black'}>{student.attendance}%</span>
                       </div>
                       <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full transition-all duration-1000 ${student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendance}%` }}></div>
                       </div>
                    </div>
                    <div className="text-center">
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CGPA Node</div>
                       <div className="font-black text-slate-900 text-2xl tracking-tighter">{student.cgpa}</div>
                    </div>
                    <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase border-2 shadow-sm ${
                       student.status === 'Excellent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       student.status === 'Average' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                       'bg-rose-50 text-rose-600 border-rose-100 animate-pulse'
                    }`}>
                       {student.status}
                    </div>
                    <button className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                       <ChevronRight size={24} />
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyAnalytics;
