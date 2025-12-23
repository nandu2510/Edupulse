
import React from 'react';
import { Users, MapPin, Calendar, CheckCircle, Info, Sparkles } from 'lucide-react';
import { CampusEvent } from '../types';

interface ClubsProps {
  events: CampusEvent[];
  onToggleRegistration: (id: string) => void;
}

const Clubs: React.FC<ClubsProps> = ({ events, onToggleRegistration }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Campus Life Engine
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Student Hub</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Discover verified chapters and exclusive campus events.</p>
        </div>
        <button className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg transition-all flex items-center gap-3 shadow-2xl shadow-slate-200">
          <Users size={24} />
          Club Directory
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map(event => (
          <div key={event.id} className="glass rounded-[3rem] overflow-hidden border border-white card-hover shadow-xl flex flex-col h-full">
            <div className="relative h-64 overflow-hidden group">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black uppercase text-indigo-600 shadow-xl border border-white">
                  {event.organizer}
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Official Partner</span>
              </div>
            </div>
            
            <div className="p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{event.title}</h3>
              <p className="text-slate-500 font-medium mb-8 line-clamp-2 leading-relaxed text-sm flex-1">{event.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-slate-50 rounded-3xl flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">Date</div>
                    <div className="text-xs font-bold text-slate-800">{event.date.split('-')[2]} OCT</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-3xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">Location</div>
                    <div className="text-xs font-bold text-slate-800 truncate w-20">{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onToggleRegistration(event.id)}
                  className={`flex-1 py-5 rounded-[2rem] font-black text-sm transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg ${
                    event.registered 
                      ? 'bg-emerald-500 text-white shadow-emerald-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {event.registered ? <><CheckCircle size={20} /> Registered</> : 'Join Event'}
                </button>
                <button className="p-5 bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white rounded-[1.5rem] transition-all">
                  <Info size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
