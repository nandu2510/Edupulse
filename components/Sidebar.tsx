
import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Calendar as CalendarIcon, 
  GraduationCap, 
  Users, 
  Library as LibraryIcon, 
  BookOpen,
  Settings,
  LogOut,
  X,
  Sparkles,
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSettingsOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose, onSettingsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'schedule', label: 'Timetable', icon: CalendarIcon },
    { id: 'performance', label: 'Academics', icon: GraduationCap },
    { id: 'clubs', label: 'Events', icon: Users },
    { id: 'library', label: 'Library', icon: LibraryIcon },
    { id: 'tasks', label: 'Objectives', icon: BookOpen },
  ];

  return (
    <>
      {/* Heavy Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-[70] h-screen transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 w-72 glass-dark m-0 lg:m-4 rounded-none lg:rounded-[3rem] shadow-2xl
      `}>
        <div className="flex flex-col h-full">
          <div className="p-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 rotate-3 group-hover:rotate-0 transition-transform">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-white leading-none">EduPulse</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Intelligence</span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>

          <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar pt-4 pb-10">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-4">
              Control Panel
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300
                  ${activeTab === item.id 
                    ? 'bg-indigo-600 text-white font-extrabold shadow-xl shadow-indigo-900/40 scale-105' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white font-bold'}
                `}
              >
                <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'text-slate-500'} />
                <span className="tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-8 space-y-2 mt-auto">
            <button 
              onClick={onSettingsOpen}
              className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-white font-bold transition-colors group"
            >
              <Settings size={22} className="group-hover:rotate-45 transition-transform" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-4 px-6 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl font-black transition-all">
              <LogOut size={22} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
