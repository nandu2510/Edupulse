
import React, { useState } from 'react';
import { Library as LibraryIcon, Search, Book, Clock, AlertTriangle, ArrowRight, CheckCircle, Eye, X, User as UserIcon, FileText } from 'lucide-react';
import { MOCK_LIBRARY } from '../constants';
import { Material } from '../types';

interface LibraryProps {
  materials: Material[];
}

const Library: React.FC<LibraryProps> = ({ materials }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [viewingAsset, setViewingAsset] = useState<any>(null);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaid(true);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="glass p-10 rounded-[4rem] border border-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-10">
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Resource Hub</h3>
                <p className="text-slate-500 font-medium text-lg mt-3">Authenticated digital resource circulation and asset node.</p>
              </div>
              <div className="relative group">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all" />
                <input 
                  type="text" 
                  placeholder="Global asset search..." 
                  className="pl-16 pr-8 py-5 rounded-[2rem] bg-slate-50 border-none text-sm w-full md:w-80 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Combine Library Books and Faculty Materials for a unified view */}
              {MOCK_LIBRARY.map(book => (
                <div key={book.id} className="p-8 rounded-[3rem] bg-white border border-slate-50 hover:border-indigo-100 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-sm hover:shadow-2xl">
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-300 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Book size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tighter leading-none">{book.title}</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-3 leading-none">{book.author}</p>
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mt-4 border shadow-sm ${
                        book.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {book.status === 'Overdue' && <AlertTriangle size={12} />}
                        {book.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                       <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Institutional Deadline</div>
                       <div className={`text-xl font-black tracking-tighter ${book.status === 'Overdue' ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                         {book.dueDate}
                       </div>
                    </div>
                    <button onClick={() => setViewingAsset(book)} className="p-5 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-[1.5rem] transition-all shadow-sm">
                       <Eye size={24} />
                    </button>
                  </div>
                </div>
              ))}

              {materials.slice(0, 3).map(mat => (
                <div key={mat.id} className="p-8 rounded-[3rem] bg-indigo-50/30 border border-indigo-100/50 hover:border-indigo-200 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-sm hover:shadow-2xl">
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-20 bg-indigo-100 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tighter leading-none">{mat.title}</h4>
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mt-3 leading-none">Uploaded By: {mat.uploadedBy}</p>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mt-4 border bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                        Institutional Asset
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                       <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Release Node</div>
                       <div className="text-xl font-black tracking-tighter text-slate-800">{mat.date}</div>
                    </div>
                    <button onClick={() => setViewingAsset(mat)} className="p-5 bg-indigo-600 text-white hover:bg-slate-900 rounded-[1.5rem] transition-all shadow-xl shadow-indigo-200">
                       <Eye size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          <section className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="p-5 bg-white/10 w-fit rounded-[1.5rem] mb-10 shadow-xl border border-white/10">
                <Clock size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-2 leading-none">Liability Status</h3>
              <div className="text-6xl font-black mb-8 tracking-tighter text-indigo-400">
                ₹{paid ? '0' : MOCK_LIBRARY.reduce((acc, b) => acc + b.fine, 0)}
              </div>
              <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg">
                {paid ? 'Financial clearance verified. No outstanding liabilities detected.' : 'Current dues detected. Clear outstanding balance to maintain digital clearance.'}
              </p>
              {!paid ? (
                <button 
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 py-6 rounded-[2.5rem] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50"
                >
                  {isPaying ? 'Node Sync...' : 'Settle Financial Hub'}
                </button>
              ) : (
                 <div className="w-full bg-emerald-500/10 text-emerald-400 py-6 rounded-[2.5rem] font-black text-xl border border-emerald-500/20 flex items-center justify-center gap-3 animate-in zoom-in-95">
                    <CheckCircle size={28} /> Transaction Verified
                 </div>
              )}
            </div>
          </section>

          <section className="glass p-10 rounded-[3rem] border border-white shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-8 flex items-center gap-4 leading-none">
              <LibraryIcon size={28} className="text-indigo-500" /> Institutional Catalog
            </h3>
            <div className="space-y-4">
              {['Digital Thesis Roster', 'Resource Reservations', 'Inter-Branch Node Loan', 'Central Archival Sync'].map(link => (
                <button 
                  key={link} 
                  className="w-full text-left px-8 py-5 rounded-[2rem] bg-white border border-slate-50 hover:bg-slate-900 hover:text-white text-sm font-black uppercase tracking-widest text-slate-500 transition-all flex items-center justify-between group shadow-sm active:scale-95"
                >
                  {link}
                  <ArrowRight size={20} className="text-slate-200 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {viewingAsset && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-10 bg-slate-950/80 backdrop-blur-3xl animate-in fade-in">
          <div className="bg-white w-full h-full max-w-6xl rounded-[4rem] shadow-2xl flex flex-col overflow-hidden border border-white relative animate-in zoom-in-95">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl">
                    <FileText size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{viewingAsset.title}</h3>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-3">Verified Digital Edition • Institutional Secure Instance</p>
                  </div>
               </div>
               <button onClick={() => setViewingAsset(null)} className="p-4 hover:bg-slate-50 rounded-[2rem] transition-all">
                 <X size={48} />
               </button>
            </div>
            
            <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 lg:p-20 overflow-hidden relative">
               {viewingAsset.url && viewingAsset.url !== '#' ? (
                  <iframe 
                    src={viewingAsset.url} 
                    className="w-full h-full rounded-2xl border-none shadow-2xl" 
                    title="Asset Preview"
                  />
               ) : (
                  <div className="w-full max-w-4xl h-full bg-white shadow-2xl rounded-[3rem] border border-slate-200 p-20 flex flex-col items-center justify-center text-center space-y-12">
                     <div className="p-16 bg-slate-50 rounded-full text-slate-100 shadow-inner">
                       <LibraryIcon size={140} />
                     </div>
                     <div className="space-y-4">
                       <h4 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Encrypted Digital Hub</h4>
                       <p className="text-slate-500 max-w-xl font-medium text-xl leading-relaxed">You are viewing a secure institutional copy. Printing and local caching is restricted for this verified instance.</p>
                     </div>
                     <div className="flex items-center gap-5 px-12 py-5 bg-emerald-50 text-emerald-600 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.3em] border border-emerald-100 shadow-xl shadow-emerald-100/30">
                       <CheckCircle size={28} /> Identity Verified • Secure Node
                     </div>
                  </div>
               )}
            </div>
            
            <div className="p-12 bg-slate-900 text-white flex justify-between items-center">
               <div className="flex items-center gap-12">
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Node Identifier: {viewingAsset.id || 'N/A'}</div>
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Hub: VITB-CENTRAL</div>
               </div>
               <div className="flex gap-8">
                  <button className="px-12 py-5 rounded-[2.5rem] bg-white/10 hover:bg-white/20 font-black text-[10px] uppercase tracking-widest transition-all">Next Cluster</button>
                  <button onClick={() => setViewingAsset(null)} className="px-16 py-5 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/30">Release Session</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
