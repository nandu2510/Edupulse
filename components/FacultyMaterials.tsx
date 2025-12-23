
import React, { useState, useRef } from 'react';
import { FileText, Plus, Search, Trash2, Upload, X, Sparkles, BookOpen, Eye, CheckCircle, Loader2 } from 'lucide-react';
import { Material } from '../types';

interface FacultyMaterialsProps {
  materials: Material[];
  onAddMaterial: (mat: Omit<Material, 'id'>) => void;
}

const FacultyMaterials: React.FC<FacultyMaterialsProps> = ({ materials, onAddMaterial }) => {
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newMat, setNewMat] = useState({ title: '', subject: 'Machine Learning', type: 'PDF' as any });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulating real upload processing
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      
      onAddMaterial({
        ...newMat,
        uploadedBy: 'Dr. Sarah Chen',
        date: new Date().toISOString().split('T')[0],
        url: dataUrl // Store the data URL so students can view the actual content
      });

      setIsUploading(false);
      setNewMat({ title: '', subject: 'Machine Learning', type: 'PDF' });
      setSelectedFile(null);
      setShowForm(false);
    };
    
    // Simulate latency
    setTimeout(() => {
      reader.readAsDataURL(selectedFile);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-indigo-100 shadow-xl shadow-indigo-100/10">
              <Sparkles size={12} className="animate-pulse" /> Unified Resource Node
           </div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Study Lab Management</h2>
           <p className="text-slate-500 font-medium text-lg mt-2">Propagate verified academic resources and PDFs to your batch enrollment.</p>
        </div>
        <button 
           onClick={() => setShowForm(true)}
           className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all flex items-center gap-3 shadow-2xl shadow-slate-200 active:scale-95"
        >
           <Upload size={24} />
           Dispatch New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
         {materials.map(mat => (
            <div key={mat.id} className="glass rounded-[3rem] p-10 border border-white shadow-xl card-hover flex flex-col group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                  <FileText size={80} />
               </div>
               <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-100/50">
                     <FileText size={28} />
                  </div>
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">{mat.type}</span>
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors tracking-tight">{mat.title}</h3>
               <div className="flex items-center gap-2 mb-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <BookOpen size={14} className="text-indigo-400" /> {mat.subject}
               </div>
               <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{mat.date}</span>
                  <div className="flex gap-2">
                     <button className="text-rose-300 hover:text-rose-600 p-2 transition-colors"><Trash2 size={20} /></button>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
           <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-[4rem] shadow-2xl p-12 border border-white space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Disseminate <br /><span className="text-indigo-600">Resource</span></h3>
                 <button type="button" onClick={() => setShowForm(false)} className="text-slate-300 hover:text-slate-900"><X size={32}/></button>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Asset Label</label>
                    <input 
                      type="text" required placeholder="Lecture 12: Advanced NN..."
                      value={newMat.title}
                      onChange={e => setNewMat({...newMat, title: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-3xl px-8 py-5 focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800"
                    />
                 </div>

                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className={`border-4 border-dashed rounded-[2.5rem] p-10 text-center cursor-pointer transition-all ${
                     selectedFile ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100 hover:border-indigo-100'
                   }`}
                 >
                    <input 
                      type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" 
                      className="hidden" ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {selectedFile ? (
                      <div className="space-y-3">
                         <CheckCircle size={40} className="mx-auto" />
                         <p className="font-black text-sm uppercase tracking-widest">{selectedFile.name}</p>
                         <p className="text-[10px] font-medium opacity-60">Ready for propagation</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                         <Upload size={40} className="mx-auto opacity-20" />
                         <p className="font-black text-sm uppercase tracking-widest">Select Institutional PDF</p>
                         <p className="text-[10px] font-medium opacity-60">PDF, PPTX or DOCX supported</p>
                      </div>
                    )}
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Subject Node</label>
                      <select 
                        value={newMat.subject}
                        onChange={e => setNewMat({...newMat, subject: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-4 focus:ring-indigo-100 outline-none font-black text-indigo-600"
                      >
                         <option>Machine Learning</option>
                         <option>Operating Systems</option>
                         <option>Cloud Computing</option>
                         <option>Discrete Maths</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Asset Type</label>
                      <select 
                        value={newMat.type}
                        onChange={e => setNewMat({...newMat, type: e.target.value as any})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 focus:ring-4 focus:ring-indigo-100 outline-none font-black text-indigo-600"
                      >
                         <option>PDF</option>
                         <option>Slides</option>
                         <option>Notes</option>
                      </select>
                   </div>
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading || !selectedFile}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-indigo-100 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isUploading ? <><Loader2 size={24} className="animate-spin" /> Node Uplinking...</> : 'Propagate Resource'}
              </button>
           </form>
        </div>
      )}
    </div>
  );
};

export default FacultyMaterials;
