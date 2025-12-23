
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FacultyDashboard from './components/FacultyDashboard';
import Announcements from './components/Announcements';
import Schedule from './components/Schedule';
import Performance from './components/Performance';
import FacultyAnalytics from './components/FacultyAnalytics';
import Clubs from './components/Clubs';
import Library from './components/Library';
import Tasks from './components/Tasks';
import Materials from './components/Materials';
import FacultyMaterials from './components/FacultyMaterials';
import CalendarTab from './components/CalendarTab';
import AIChatbot from './components/AIChatbot';
import { MOCK_USER, MOCK_FACULTY, MOCK_ANNOUNCEMENTS, MOCK_TASKS, MOCK_EVENTS, MOCK_MATERIALS, INSTITUTION_CODE } from './constants';
import { Menu, Search, Bell, X, Sparkles, User as UserIcon, Settings as SettingsIcon, LogOut, SearchX, CheckCircle, Mail, Lock, ShieldCheck, Eye, EyeOff, AlertTriangle, Info, Megaphone } from 'lucide-react';
import { generateDigest, extractDeadlines } from './services/geminiService';
import { Task, CampusEvent, Announcement, Material, UserRole, User, Notification as AppNotification } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Login UI States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Persistent shared states
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('edu_tasks');
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });
  
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('edu_events');
    return saved ? JSON.parse(saved) : MOCK_EVENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('edu_announcements');
    return saved ? JSON.parse(saved) : MOCK_ANNOUNCEMENTS;
  });

  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem('edu_materials');
    return saved ? JSON.parse(saved) : MOCK_MATERIALS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('edu_notifications');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeAlert, setActiveAlert] = useState<AppNotification | null>(null);

  // UI States
  const [showDigestModal, setShowDigestModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [digestContent, setDigestContent] = useState<string | null>(null);
  const [isGeneratingDigest, setIsGeneratingDigest] = useState(false);

  // Persist states
  useEffect(() => { localStorage.setItem('edu_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('edu_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('edu_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('edu_materials', JSON.stringify(materials)); }, [materials]);
  useEffect(() => { localStorage.setItem('edu_notifications', JSON.stringify(notifications)); }, [notifications]);

  // Sync announcements and materials across tabs (simulation of real-time)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'edu_announcements' && e.newValue) {
        const newAnnouncements = JSON.parse(e.newValue);
        if (newAnnouncements.length > announcements.length) {
          const latest = newAnnouncements[0]; 
          setAnnouncements(newAnnouncements);
          
          // Trigger alert for student sessions
          if (currentUser?.role === UserRole.STUDENT) {
            const newNotif: AppNotification = {
              id: `notif-sync-${Date.now()}`,
              title: 'New Faculty Dispatch',
              message: `${latest.postedBy} published: ${latest.title}`,
              time: 'Just now',
              type: 'announcement',
              isRead: false
            };
            setNotifications(prev => [newNotif, ...prev]);
            setActiveAlert(newNotif);
            setTimeout(() => setActiveAlert(null), 10000);
          }
        }
      }
      if (e.key === 'edu_materials' && e.newValue) {
        setMaterials(JSON.parse(e.newValue));
      }
      if (e.key === 'edu_notifications' && e.newValue) {
        setNotifications(JSON.parse(e.newValue));
      }
      if (e.key === 'edu_tasks' && e.newValue) {
        setTasks(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [announcements.length, currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === MOCK_USER.email && loginPassword === 'password123') {
      setCurrentUser(MOCK_USER);
    } else if (loginEmail === MOCK_FACULTY.email && loginPassword === 'password123') {
      setCurrentUser(MOCK_FACULTY);
    } else {
      setLoginError('Invalid institutional credentials. Please try again.');
    }
  };

  const handleGenerateDigest = async () => {
    setShowDigestModal(true);
    setIsGeneratingDigest(true);
    try {
      const content = await generateDigest(announcements, tasks);
      setDigestContent(content);
    } catch (err) {
      setDigestContent("Failed to generate digest. Institutional engine offline.");
    } finally {
      setIsGeneratingDigest(false);
    }
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: `t-${Date.now()}` };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('edu_tasks', JSON.stringify(updatedTasks));
  };

  const addAnnouncement = async (ann: Omit<Announcement, 'id'>) => {
    const newAnn = { ...ann, id: `ann-${Date.now()}`, isRead: false };
    const updatedAnnouncements = [newAnn, ...announcements];
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('edu_announcements', JSON.stringify(updatedAnnouncements));
    
    const newNotif: AppNotification = {
      id: `notif-ann-${Date.now()}`,
      title: 'New Faculty Announcement',
      message: `${ann.postedBy} published: ${ann.title}`,
      time: 'Just now',
      type: 'announcement',
      isRead: false
    };
    
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    localStorage.setItem('edu_notifications', JSON.stringify(updatedNotifs));
    
    // Auto-extract deadlines and add to tasks (Calendar)
    try {
      const deadlineInfo = await extractDeadlines(ann.content);
      if (deadlineInfo && deadlineInfo.date) {
        addTask({
          title: deadlineInfo.title || ann.title,
          dueDate: deadlineInfo.date,
          category: (deadlineInfo.type as any) || 'Assignment',
          status: 'Pending'
        });
      }
    } catch (err) {
      console.warn("AI extraction failed, skipping automatic task addition.");
    }

    if (currentUser?.role === UserRole.STUDENT) {
      setActiveAlert(newNotif);
      setTimeout(() => setActiveAlert(null), 10000);
    }
  };

  const addMaterial = (mat: Omit<Material, 'id'>) => {
    const newMat = { ...mat, id: `mat-${Date.now()}` };
    const updatedMaterials = [newMat, ...materials];
    setMaterials(updatedMaterials);
    localStorage.setItem('edu_materials', JSON.stringify(updatedMaterials));
  };

  const toggleEventRegistration = (eventId: string) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered: !e.registered } : e));
  };

  const renderContent = () => {
    if (searchQuery) return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tighter">Search Hub: "{searchQuery}"</h2>
        <div className="p-20 glass rounded-[3rem] text-center border-2 border-dashed border-slate-200">
           <SearchX size={64} className="mx-auto mb-4 text-slate-200" />
           <p className="text-slate-500 font-bold uppercase tracking-widest">Global indexing synchronized...</p>
        </div>
      </div>
    );

    if (currentUser?.role === UserRole.STUDENT) {
      switch (activeTab) {
        case 'dashboard': return <Dashboard onDigestClick={handleGenerateDigest} tasks={tasks} announcements={announcements} />;
        case 'announcements': return <Announcements announcements={announcements} onAddTask={addTask} />;
        case 'calendar': return <CalendarTab tasks={tasks} events={events} setTasks={setTasks} setEvents={setEvents} />;
        case 'materials': return <Materials materials={materials} />;
        case 'schedule': return <Schedule userRole={UserRole.STUDENT} />;
        case 'performance': return <Performance />;
        case 'clubs': return <Clubs events={events} onToggleRegistration={toggleEventRegistration} />;
        case 'library': return <Library materials={materials} />;
        case 'tasks': return <Tasks tasks={tasks} setTasks={setTasks} />;
        default: return <Dashboard onDigestClick={handleGenerateDigest} tasks={tasks} announcements={announcements} />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <FacultyDashboard announcements={announcements} onAddAnnouncement={addAnnouncement} tasks={tasks} />;
        case 'announcements': return <Announcements announcements={announcements} onAddTask={addTask} isFaculty />;
        case 'materials': return <FacultyMaterials materials={materials} onAddMaterial={addMaterial} />;
        case 'analytics': return <FacultyAnalytics />;
        case 'schedule': return <Schedule userRole={UserRole.FACULTY} />;
        case 'clubs': return <Clubs events={events} onToggleRegistration={toggleEventRegistration} />;
        default: return <FacultyDashboard announcements={announcements} onAddAnnouncement={addAnnouncement} tasks={tasks} />;
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative">
        <div className="glass-dark p-12 rounded-[4rem] w-full max-w-xl space-y-10 border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center gap-6">
             <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30 ring-8 ring-indigo-600/10">
               <Sparkles size={48} className="text-white" />
             </div>
             <div className="text-center">
               <h1 className="text-5xl font-black text-white tracking-tighter leading-none">EduPulse</h1>
               <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mt-3">Unified Institutional Node</p>
             </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
             <div className="space-y-4">
               <div className="relative group">
                 <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                 <input 
                   type="email" required placeholder="Institutional Email"
                   value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-16 pr-6 py-5 text-white outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
                 />
               </div>
               <div className="relative group">
                 <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                 <input 
                   type={showPassword ? "text" : "password"} required placeholder="Secure Access Key"
                   value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-16 pr-16 py-5 text-white outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all font-medium"
                 />
                 <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                 >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
               </div>
             </div>

             {loginError && (
               <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-bold text-center">
                 {loginError}
               </div>
             )}

             <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3">
               <ShieldCheck size={24} /> Authenticate Access
             </button>
          </form>

          <div className="text-center pt-4 opacity-50">
             <p className="text-white text-[10px] font-bold uppercase tracking-widest">Demo Credentials:</p>
             <p className="text-slate-400 text-[10px] mt-1 font-medium italic">alex.j@vitb.edu.in (Student) • s.chen@vitb.edu.in (Faculty)</p>
             <p className="text-slate-400 text-[10px] font-medium italic">Access Code: password123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Real-time Alert Notification for Student */}
      {activeAlert && currentUser.role === UserRole.STUDENT && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] w-full max-w-2xl px-6 animate-in slide-in-from-top-20 duration-500">
           <div className="bg-slate-900 border border-indigo-500/50 rounded-[3rem] p-8 shadow-[0_40px_100px_rgba(99,102,241,0.5)] flex items-center gap-8 relative overflow-hidden ring-4 ring-indigo-500/10">
              <div className="absolute inset-0 bg-indigo-600/20 animate-pulse"></div>
              <div className="p-5 bg-indigo-600 rounded-[2rem] text-white shadow-2xl relative z-10 border border-indigo-400/50">
                 <Megaphone size={32} className="animate-bounce" />
              </div>
              <div className="flex-1 relative z-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] mb-2 border border-indigo-500/30">
                    <Sparkles size={12} /> Institutional Priority
                 </div>
                 <h4 className="text-white font-black text-2xl tracking-tighter leading-none">{activeAlert.title}</h4>
                 <p className="text-indigo-200 font-bold text-lg mt-2 leading-tight">{activeAlert.message}</p>
              </div>
              <button onClick={() => setActiveAlert(null)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white relative z-10 transition-all">
                 <X size={28} />
              </button>
           </div>
        </div>
      )}

      <Sidebar 
        userRole={currentUser.role}
        activeTab={activeTab} 
        setActiveTab={(t) => { setActiveTab(t); setSearchQuery(''); }} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSettingsOpen={() => setShowSettings(true)}
      />

      <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 px-4 lg:px-8 py-4 flex items-center justify-between glass border-b border-white/50 m-2 lg:m-4 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 bg-white/50 text-slate-700 rounded-2xl"><Menu size={24} /></button>
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded w-fit">Security Level: {currentUser.role}</span>
              <h2 className="font-extrabold text-slate-900 text-2xl capitalize mt-1 tracking-tighter leading-none">{activeTab.replace('-', ' ')}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative group">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-2xl transition-all shadow-sm ${showNotifications || (notifications.length > 0 && !notifications[0].isRead) ? 'bg-indigo-600 text-white shadow-xl scale-110' : 'bg-white/50 text-slate-600'}`}
              >
                <Bell size={22} />
                {notifications.some(n => !n.isRead) && <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>}
              </button>

              {showNotifications && (
                <div className="absolute top-16 right-0 w-96 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                  <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                    <h4 className="font-black text-xl tracking-tight">Intelligence Stream</h4>
                    <span className="text-[10px] bg-indigo-600 px-3 py-1 rounded-full uppercase font-black">{notifications.length} Nodes</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar p-2">
                    {notifications.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Environment Stable</div>
                    ) : notifications.map(n => (
                      <div key={n.id} onClick={() => {
                        const newNotifs = notifications.map(not => not.id === n.id ? {...not, isRead: true} : not);
                        setNotifications(newNotifs);
                        setShowNotifications(false);
                      }} className="p-5 hover:bg-slate-50 rounded-2xl cursor-pointer group border-b border-slate-50 last:border-none transition-all">
                        <div className="flex items-start gap-4">
                           <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.type === 'deadline' ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></div>
                           <div className={n.isRead ? 'opacity-50' : ''}>
                              <p className="text-sm font-black text-slate-900 leading-tight">{n.title}</p>
                              <p className="text-xs text-slate-500 mt-1 font-medium">{n.message}</p>
                              <span className="text-[10px] font-black text-slate-300 uppercase mt-2 block tracking-widest">{n.time}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-3 cursor-pointer group pl-4 border-l border-slate-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-none">{currentUser.name}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified Session</p>
              </div>
              <div className="w-12 h-12 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <UserIcon size={24} className="text-slate-400" />
              </div>
            </div>

            {showProfile && (
              <div className="absolute top-20 right-8 w-80 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                 <div className="p-10 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
                    <div className="w-24 h-24 rounded-[2rem] mx-auto mb-6 bg-white flex items-center justify-center shadow-2xl">
                       <UserIcon size={48} className="text-indigo-500" />
                    </div>
                    <h4 className="font-black text-2xl text-slate-900 tracking-tighter leading-none">{currentUser.name}</h4>
                    <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mt-3 leading-none">{currentUser.department}</p>
                 </div>
                 <div className="p-6 space-y-2">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all">
                       <ShieldCheck size={20} className="text-slate-400" /> Security Shield
                    </button>
                    <button onClick={() => {setShowSettings(true); setShowProfile(false);}} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-slate-50 text-sm font-bold text-slate-700 transition-all">
                       <SettingsIcon size={20} className="text-slate-400" /> Node Sync
                    </button>
                    <div className="my-4 border-t border-slate-100"></div>
                    <button onClick={() => setCurrentUser(null)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-rose-50 text-sm font-black text-rose-600 transition-all">
                       <LogOut size={20} /> Terminate Access
                    </button>
                 </div>
              </div>
            )}
          </div>
        </header>

        <div className="p-4 lg:p-10 flex-1 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>

        <footer className="p-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full shadow-sm">
            <CheckCircle size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Institutional Node Verified • 2025 Node-X</span>
          </div>
        </footer>
      </main>

      <AIChatbot isFaculty={currentUser.role === UserRole.FACULTY} />

      {showDigestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl animate-in fade-in">
           <div className="bg-white w-full max-w-3xl rounded-[4rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-white">
            <div className="p-10 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Sparkles size={32} className="text-indigo-400" />
                <h3 className="text-3xl font-black tracking-tighter">AI Pulse Report</h3>
              </div>
              <button onClick={() => setShowDigestModal(false)} className="hover:rotate-90 transition-transform"><X size={32}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar text-xl leading-relaxed text-slate-800 font-medium whitespace-pre-line">
              {isGeneratingDigest ? <div className="text-center animate-pulse py-20">Synthesizing institutional updates...</div> : <div>{digestContent}</div>}
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xl animate-in fade-in">
           <div className="bg-white w-full max-w-xl rounded-[4rem] shadow-2xl p-12 border border-white animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter">System Schema</h3>
                 <button onClick={() => setShowSettings(false)} className="text-slate-300 hover:text-slate-900"><X size={32}/></button>
              </div>
              <div className="space-y-4">
                 <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-4">
                       <Info size={18} className="text-indigo-500" />
                       <span className="font-black text-slate-800 uppercase tracking-widest text-xs">Dark Mode Synthesis</span>
                    </div>
                    <button className="w-14 h-8 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm"></div></button>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-4">
                       <Sparkles size={18} className="text-indigo-500" />
                       <span className="font-black text-slate-800 uppercase tracking-widest text-xs">AI Proactive Hub</span>
                    </div>
                    <button className="w-14 h-8 bg-indigo-600 rounded-full relative"><div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm"></div></button>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-4">
                       <ShieldCheck size={18} className="text-indigo-500" />
                       <span className="font-black text-slate-800 uppercase tracking-widest text-xs">Institutional Node Sync</span>
                    </div>
                    <button className="w-14 h-8 bg-indigo-600 rounded-full relative"><div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-sm"></div></button>
                 </div>
              </div>
              <button onClick={() => setShowSettings(false)} className="w-full mt-10 bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95">Apply Parameters</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
