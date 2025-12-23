
import React, { useState } from 'react';
import { FileText, Search, Download, Eye, Clock, User, Filter, BookOpen, X, AlertCircle } from 'lucide-react';
import { MOCK_MATERIALS } from '../constants';

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingMaterial, setViewingMaterial] = useState<any>(null);
  const subjects = Array.from(new Set(MOCK_MATERIALS.map(m => m.subject)));
  const [selectedSubject, setSelectedSubject] = useState<string | 'All'>('All');

  const filteredMaterials = MOCK_MATERIALS.filter(m => 
    (selectedSubject === 'All' || m.subject === selectedSubject) &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Course Materials</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Verified academic resources and PDFs uploaded by faculty.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all" size={18} />
            <input 
              type="text" 
              placeholder="Search materials..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm w-48 lg:w-64 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-800 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
        <button 
          onClick={() => setSelectedSubject('All')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
            selectedSubject === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Subjects
        </button>
        {subjects.map(sub => (
          <button 
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              selectedSubject === sub ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMaterials.map(material => (
          <div key={material.id} className="glass rounded-[2.5rem] border border-white shadow-xl card-hover p-8 flex flex-col group">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <FileText size={28} />
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {material.type}
              </span>
            </div>
            
            <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
              {material.title}
            </h4>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={14} className="text-indigo-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{material.subject}</span>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <User size={14} className="text-slate-300" /> {material.uploadedBy}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <Clock size={14} className="text-slate-300" /> {material.date}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <button 
                onClick={() => setViewingMaterial(material)}
                className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg"
              >
                <Eye size={16} /> View
              </button>
              <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                <Download size={16} /> Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewingMaterial && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-10 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white w-full h-full max-w-5xl rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-white relative animate-in zoom-in-95 duration-500">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{viewingMaterial.title}</h3>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{viewingMaterial.subject} • READ-ONLY ACCESS</p>
                  </div>
               </div>
               <button onClick={() => setViewingMaterial(null)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                 <X size={32} />
               </button>
            </div>
            
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 lg:p-12 overflow-hidden">
               <div className="w-full max-w-3xl h-full bg-white shadow-2xl rounded-xl border border-slate-200 p-10 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-10 bg-slate-50 rounded-full text-slate-300">
                    <FileText size={100} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-800 tracking-tight">PDF Preview Module</h4>
                    <p className="text-slate-500 max-w-md font-medium">This is a secure, read-only viewer. Printing and editing is disabled for this resource by {viewingMaterial.uploadedBy}.</p>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-amber-50 text-amber-600 rounded-full text-sm font-bold border border-amber-100">
                    <AlertCircle size={18} /> Encrypted Session
                  </div>
               </div>
            </div>
            
            <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
               <div className="flex items-center gap-6">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">Page 1 of 24</div>
               </div>
               <div className="flex gap-4">
                  <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-all uppercase tracking-widest">Next Page</button>
                  <button onClick={() => setViewingMaterial(null)} className="px-10 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm transition-all uppercase tracking-widest">Finish Reading</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
