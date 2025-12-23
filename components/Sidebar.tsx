
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
  X,
  Sparkles,
  FileText,
  BarChart3,
  User as UserIcon
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  userRole: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSettingsOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, activeTab, setActiveTab, isOpen, onClose, onSettingsOpen }) => {
  const studentItems = [
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

  const facultyItems = [
    { id: 'dashboard', label: 'Control Hub', icon: LayoutDashboard },
    { id: 'analytics', label: 'Student Insights', icon: BarChart3 },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'materials', label: 'Upload Study Lab', icon: FileText },
    { id: 'schedule', label: 'Timetable', icon: CalendarIcon },
    { id: 'clubs', label: 'Events', icon: Users },
  ];

  const menuItems = userRole === UserRole.FACULTY ? facultyItems : studentItems;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-[70] h-screen transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-72 glass-dark m-0 lg:m-4 rounded-none lg:rounded-[3rem] shadow-2xl`}>
        <div className="flex flex-col h-full">
          <div className="p-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-indigo-600/20"><Sparkles size={24} className="text-white" /></div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-white tracking-tighter leading-none">EduPulse</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-2">Enterprise</span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500 p-2 hover:bg-white/10 rounded-xl transition-all"><X size={28} /></button>
          </div>

          <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto custom-scrollbar pt-4 pb-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); if (window.innerWidth < 1024) onClose(); }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all group ${activeTab === item.id ? 'bg-indigo-600 text-white font-extrabold shadow-xl shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon size={22} className={`${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`} />
                <span className="tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-8 space-y-2 mt-auto">
            <button onClick={onSettingsOpen} className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-white font-bold transition-all group rounded-[1.5rem] hover:bg-white/5">
              <Settings size={22} className="group-hover:rotate-45 transition-transform" />
              <span>Platform Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
