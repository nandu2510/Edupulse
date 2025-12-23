
import React, { useState } from 'react';
import { Library as LibraryIcon, Search, Book, Clock, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import { MOCK_LIBRARY } from '../constants';

const Library: React.FC = () => {
  const [isPaying, setIsPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaid(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">My Issued Books</h3>
                <p className="text-slate-500 text-sm mt-1">Track your borrowed resources and return dates.</p>
              </div>
              <div className="relative group">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search library catalog..." 
                  className="pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border-none text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              {MOCK_LIBRARY.map(book => (
                <div key={book.id} className="p-5 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shadow-inner group-hover:bg-blue-50 group-hover:text-blue-200 transition-colors">
                      <Book size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{book.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mb-3">{book.author}</p>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        book.status === 'Overdue' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {book.status === 'Overdue' && <AlertTriangle size={10} />}
                        {book.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 text-right">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-tight">Return By</div>
                    <div className={`font-bold ${book.status === 'Overdue' ? 'text-red-500' : 'text-slate-800'}`}>
                      {book.dueDate}
                    </div>
                  </div>

                  <button className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="p-3 bg-white/10 w-fit rounded-2xl mb-6">
                <Clock size={24} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Pending Fines</h3>
              <div className="text-4xl font-black mb-4 tracking-tight">
                ₹{paid ? '0' : MOCK_LIBRARY.reduce((acc, b) => acc + b.fine, 0)}
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {paid ? 'All dues cleared. Keep up the good work!' : 'Please clear your dues to avoid suspension of library privileges.'}
              </p>
              {!paid && (
                <button 
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-70 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  {isPaying ? 'Processing...' : 'Pay Fines Online'}
                </button>
              )}
              {paid && (
                 <div className="w-full bg-emerald-600/20 text-emerald-400 py-3 rounded-2xl font-bold text-sm border border-emerald-500/30 flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Payment Verified
                 </div>
              )}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <LibraryIcon size={18} className="text-slate-400" />
              Quick Links
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {['Digital Archives', 'Reserve a Cubicle', 'Inter-Library Loan', 'Membership Renewal'].map(link => (
                <button 
                  key={link} 
                  onClick={() => alert(`${link} functionality is currently being synchronized with the VITB Library API.`)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-600 transition-colors flex items-center justify-between group"
                >
                  {link}
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Library;
