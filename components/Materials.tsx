
import React, { useState } from 'react';
import { FileText, Search, Download, Eye, Clock, User, Filter, BookOpen, X, AlertCircle, ExternalLink } from 'lucide-react';
import { Material } from '../types';

interface MaterialsProps {
  materials: Material[];
}

const Materials: React.FC<MaterialsProps> = ({ materials }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingMaterial, setViewingMaterial] = useState<any>(null);
  const subjects = Array.from(new Set(materials.map(m => m.subject)));
  const [selectedSubject, setSelectedSubject] = useState<string | 'All'>('All');

  const filteredMaterials = materials.filter(m => 
    (selectedSubject === 'All' || m.subject === selectedSubject) &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openInNewTab = (url: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Academic Lab</h2>
          <p className="text-slate-500 font-medium text-lg mt-2 tracking-tight">Verified institutional assets and resources dispatched by faculty node.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all" size={18} />
            <input 
              type="text" 
              placeholder="Query Lab..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 rounded-[1.5rem] bg-white border border-slate-200 text-sm w-48 lg:w-64 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
        <button 
          onClick={() => setSelectedSubject('All')}
          className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
            selectedSubject === 'All' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Clusters
        </button>
        {subjects.map(sub => (
          <button 
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
              selectedSubject === sub ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredMaterials.map(material => (
          <div key={material.id} className="glass rounded-[3rem] border border-white shadow-xl card-hover p-10 flex flex-col group relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-100/50">
                <FileText size={28} />
              </div>
              <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                {material.type}
              </span>
            </div>
            
            <h4 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors tracking-tighter">
              {material.title}
            </h4>
            <div className="flex items-center gap-2 mb-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <BookOpen size={14} className="text-indigo-400" />
              <span>{material.subject}</span>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <button 
                onClick={() => setViewingMaterial(material)}
                className="flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
              >
                <Eye size={18} /> View Node
              </button>
              {material.url && material.url !== '#' && (
                <a 
                  href={material.url} 
                  download={`${material.title}.pdf`}
                  className="flex items-center justify-center gap-3 py-5 bg-white border border-slate-200 text-slate-600 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
                >
                  <Download size={18} /> Save
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {viewingMaterial && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-10 bg-slate-950/80 backdrop-blur-3xl animate-in fade-in">
          <div className="bg-white w-full h-full max-w-6xl rounded-[4rem] shadow-2xl flex flex-col overflow-hidden border border-white relative animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div className="p-6 bg-indigo-600 text-white rounded-[2rem] shadow-2xl ring-8 ring-indigo-50">
                    <FileText size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{viewingMaterial.title}</h3>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-3">{viewingMaterial.subject} • INSTITUTIONAL RESOURCE</p>
                  </div>
               </div>
               <button onClick={() => setViewingMaterial(null)} className="p-4 hover:bg-slate-50 rounded-[2rem] transition-all">
                 <X size={48} />
               </button>
            </div>
            
            <div className="flex-1 bg-slate-100 flex items-center justify-center p-4 lg:p-20 overflow-hidden relative">
               {viewingMaterial.url && viewingMaterial.url !== '#' ? (
                  <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col">
                    <iframe 
                      src={viewingMaterial.url} 
                      className="w-full h-full border-none"
                      title="PDF Viewer"
                    />
                  </div>
               ) : (
                  <div className="w-full max-w-4xl h-full bg-white shadow-2xl rounded-[3rem] border border-slate-200 p-20 flex flex-col items-center justify-center text-center space-y-12">
                     <div className="p-16 bg-slate-50 rounded-full text-slate-200 shadow-inner">
                       <FileText size={140} />
                     </div>
                     <div className="space-y-4">
                       <h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Resource Preview Node</h4>
                       <p className="text-slate-500 max-w-xl font-medium text-xl leading-relaxed">Secure institutional assets require identity verification. If the preview fails to load, please open the resource in a new hub.</p>
                     </div>
                     <div className="flex flex-col items-center gap-6">
                       {viewingMaterial.url && viewingMaterial.url !== '#' && (
                         <button 
                           onClick={() => openInNewTab(viewingMaterial.url)}
                           className="px-12 py-5 bg-indigo-600 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                         >
                           <ExternalLink size={24} /> Open Full Resource Node
                         </button>
                       )}
                       <div className="flex items-center gap-5 px-12 py-5 bg-emerald-50 text-emerald-600 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.3em] border border-emerald-100 shadow-xl shadow-emerald-100/30">
                         <AlertCircle size={28} /> Session Encrypted • Alex Johnson
                       </div>
                     </div>
                  </div>
               )}
            </div>
            
            <div className="p-12 bg-slate-900 text-white flex justify-between items-center">
               <div className="flex items-center gap-12">
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Asset Ref: {viewingMaterial.id}</div>
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Hub: VITB-CENTRAL</div>
               </div>
               <div className="flex gap-8">
                  {viewingMaterial.url && viewingMaterial.url !== '#' && (
                    <button 
                      onClick={() => openInNewTab(viewingMaterial.url)}
                      className="px-10 py-5 rounded-[2.5rem] bg-white/10 hover:bg-white/20 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3"
                    >
                      <ExternalLink size={18} /> Open in New Hub
                    </button>
                  )}
                  <button onClick={() => setViewingMaterial(null)} className="px-16 py-5 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30">Release Instance</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
