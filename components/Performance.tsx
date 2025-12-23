
import React, { useState } from 'react';
import { TrendingUp, Award, BookOpen, ChevronRight, X, BarChart3, Clock } from 'lucide-react';
import { MOCK_PERFORMANCE } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Performance: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">CGPA</p>
              <h3 className="text-2xl font-bold text-slate-800">8.42</h3>
            </div>
          </div>
          <div className="text-xs text-indigo-600 font-bold flex items-center gap-1">
            <TrendingUp size={14} /> +0.2 from last sem
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Credits Earned</p>
              <h3 className="text-2xl font-bold text-slate-800">64 / 160</h3>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[40%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Rank</p>
              <h3 className="text-2xl font-bold text-slate-800">12 / 120</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">Top 10% of the batch</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Subject-wise Analytics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} 
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                  {MOCK_PERFORMANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > entry.average ? '#3b82f6' : '#94a3b8'} />
                  ))}
                </Bar>
                <Bar dataKey="average" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-6">Recent Assessments</h3>
          <div className="space-y-4">
            {MOCK_PERFORMANCE.map((item) => (
              <div 
                key={item.subject} 
                onClick={() => setSelectedAssessment(item)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    item.score > 85 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.score}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.subject}</h4>
                    <p className="text-xs text-slate-400">Internal Assessment 2 • Sept 2024</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-all group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedAssessment && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-black text-slate-800">Assessment Breakdown</h3>
                 <button onClick={() => setSelectedAssessment(null)} className="text-slate-400"><X size={24}/></button>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between p-4 bg-blue-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Award className="text-blue-600" />
                       <span className="font-bold text-blue-900">{selectedAssessment.subject}</span>
                    </div>
                    <span className="text-2xl font-black text-blue-600">{selectedAssessment.score}/100</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-1">Batch Average</div>
                       <div className="text-lg font-bold text-slate-800">{selectedAssessment.average}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-1">Rank in Subject</div>
                       <div className="text-lg font-bold text-slate-800">4 / 120</div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-medium text-slate-500">Conceptual Accuracy</span>
                       <span className="text-sm font-bold text-emerald-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-medium text-slate-500">Problem Solving Speed</span>
                       <span className="text-sm font-bold text-blue-600">High</span>
                    </div>
                 </div>
              </div>
              <button onClick={() => setSelectedAssessment(null)} className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold">Close Details</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
