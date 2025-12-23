
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Announcements from './components/Announcements';
import Schedule from './components/Schedule';
import Performance from './components/Performance';
import Clubs from './components/Clubs';
import Library from './components/Library';
import Tasks from './components/Tasks';
import Materials from './components/Materials';
import CalendarTab from './components/CalendarTab';
import AIChatbot from './components/AIChatbot';
import { MOCK_USER, MOCK_ANNOUNCEMENTS, MOCK_TASKS, MOCK_EVENTS, INSTITUTION_CODE } from './constants';
import { Menu, Search, Bell, X, Sparkles, Loader2, User as UserIcon, Settings as SettingsIcon, LogOut, CheckCircle, SearchX } from 'lucide-react';
import { generateDigest } from './services/geminiService';
import { Task, CampusEvent, Announcement } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persistent shared states
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('edu_tasks');
    return saved ? JSON.parse(saved) : MOCK_TASKS;
  });
  
  const [events, setEvents] = useState<CampusEvent[]>(() => {
    const saved = localStorage.getItem('edu_events');
    return saved ? JSON.parse(saved) : MOCK_EVENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  // UI/Modal States
  const [showDigestModal, setShowDigestModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [digestContent, setDigestContent] = useState<string | null>(null);
  const [isGeneratingDigest, setIsGeneratingDigest] = useState(false);

  useEffect(() => {
    localStorage.setItem('edu_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('edu_events', JSON.stringify(events));
  }, [events]);

  const handleGenerateDigest = async () => {
    setShowDigestModal(true);
    setIsGeneratingDigest(true);
    try {
      const content = await generateDigest(announcements, tasks);
      setDigestContent(content);
    } catch (err) {
      setDigestContent("Failed to generate digest. Please try again later.");
    } finally {
      setIsGeneratingDigest(false);
    }
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: `t-${Date.now()}` };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleEventRegistration = (eventId: string) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered: !e.registered } : e));
  };

  // Global Search Filter
  const filteredData = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    return {
      announcements: announcements.filter(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)),
      tasks: tasks.filter(t => t.title.toLowerCase().includes(q)),
      events: events.filter(e => e.title.toLowerCase().includes(q))
    };
  }, [searchQuery, announcements, tasks, events]);

  const renderContent = () => {
    if (searchQuery) {
      return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Results for "{searchQuery}"</h2>
            <button onClick={() => setSearchQuery('')} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
              Clear <X size={16} />
            </button>
          </div>

          {!filteredData?.announcements.length && !filteredData?.tasks.length && !filteredData?.events.length ? (
            <div className="flex flex-col items-center justify-center py-32 glass rounded-[3rem] border-2 border-dashed border-slate-200">
              <SearchX size={64} className="text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg font-medium">No results found in your campus database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredData?.announcements.length! > 0 && (
                <section>
                  <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-6">Found in Announcements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredData?.announcements.map(ann => (
                      <div key={ann.id} className="glass p-6 rounded-3xl card-hover border-l-8 border-indigo-500">
                        <h4 className="font-bold text-slate-900 text-xl">{ann.title}</h4>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {filteredData?.tasks.length! > 0 && (
                <section>
                  <h3 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-6">Found in Deadlines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredData?.tasks.map(task => (
                      <div key={task.id} className="glass p-6 rounded-3xl card-hover border-l-8 border-rose-500 flex flex-col justify-between">
                        <h4 className="font-bold text-slate-900">{task.title}</h4>
                        <span className="text-xs text-rose-500 font-bold mt-4 uppercase">Due {task.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard onDigestClick={handleGenerateDigest} tasks={tasks} announcements={announcements} />;
      case 'announcements': return <Announcements announcements={announcements} onAddTask={addTask} />;
      case 'calendar': return <CalendarTab tasks={tasks} events={events} />;
      case 'materials': return <Materials />;
      case 'schedule': return <Schedule />;
      case 'performance': return <Performance />;
      case 'clubs': return <Clubs events={events} onToggleRegistration={toggleEventRegistration} />;
      case 'library': return <Library />;
      case 'tasks': return <Tasks tasks={tasks} setTasks={setTasks} />;
      default: return <Dashboard onDigestClick={handleGenerateDigest} tasks={tasks} announcements={announcements} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(t) => { setActiveTab(t); setSearchQuery(''); }} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSettingsOpen={() => setShowSettings(true)}
      />

      <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Modern Glass Header */}
        <header className="sticky top-0 z-40 px-4 lg:px-8 py-4 flex items-center justify-between glass border-b border-white/50 m-2 lg:m-4 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 bg-white/50 text-slate-700 rounded-2xl hover:bg-white transition-all shadow-sm"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded w-fit">Institution: {INSTITUTION_CODE}</span>
              <h2 className="font-extrabold text-slate-900 text-2xl capitalize tracking-tight mt-1">
                {searchQuery ? 'Search Central' : activeTab.replace('-', ' ')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-all" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, peers..." 
                className="pl-12 pr-6 py-3 rounded-2xl bg-slate-100/50 border-none text-sm w-48 lg:w-72 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-800"
              />
            </div>
            
            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-2xl transition-all shadow-sm ${showNotifications ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white/50 text-slate-600 hover:bg-white'}`}
              >
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute top-16 right-0 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-300">
                  <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                    <h4 className="font-bold text-lg">Activity Feed</h4>
                    <span className="text-[10px] bg-rose-500 text-white px-2 py-1 rounded-full uppercase font-black">3 New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                    {announcements.slice(0, 3).map(a => (
                      <div key={a.id} className="p-4 hover:bg-indigo-50 rounded-2xl cursor-pointer transition-colors group">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{a.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{a.content}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full p-4 text-sm font-bold text-indigo-600 hover:bg-slate-50 transition-colors border-t border-slate-100">See All Activity</button>
                </div>
              )}
              
              <div className="h-10 w-px bg-slate-200/50 mx-2 hidden sm:block"></div>
              
              <div 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 pl-2 cursor-pointer group"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{MOCK_USER.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{MOCK_USER.studentId}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl border-2 border-white overflow-hidden ring-4 ring-slate-100 group-hover:ring-indigo-100 transition-all shadow-sm">
                  <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>

              {showProfile && (
                <div className="absolute top-16 right-0 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-300">
                   <div className="p-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
                      <div className="w-20 h-20 rounded-3xl mx-auto mb-4 border-4 border-white overflow-hidden shadow-xl">
                         <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-lg">{MOCK_USER.name}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{MOCK_USER.department}</p>
                   </div>
                   <div className="p-4 space-y-1">
                      <button onClick={() => { setActiveTab('performance'); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-indigo-50 text-sm font-bold text-slate-700 transition-colors group">
                         <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 transition-colors"><UserIcon size={18} /></div> 
                         Academic Records
                      </button>
                      <button onClick={() => { setShowSettings(true); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-indigo-50 text-sm font-bold text-slate-700 transition-colors group">
                         <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 transition-colors"><SettingsIcon size={18} /></div>
                         Preferences
                      </button>
                      <div className="my-3 border-t border-slate-100"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-rose-50 text-sm font-bold text-rose-600 transition-colors">
                         <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><LogOut size={18} /></div>
                         Log Out
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 lg:p-8 flex-1 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>

        <footer className="p-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">&copy; 2025 EduPulse Cloud • Secure Institutional Node • VITB</span>
          </div>
        </footer>
      </main>

      <AIChatbot />

      {/* Modern AI Modal */}
      {showDigestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_0_100px_rgba(99,102,241,0.2)] flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-500 border border-white">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md shadow-inner">
                  <Sparkles size={32} className="text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">Campus Intelligence</h3>
                  <p className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mt-1">Deep Learning Digest v2.4</p>
                </div>
              </div>
              <button onClick={() => setShowDigestModal(false)} className="hover:bg-white/10 p-3 rounded-[1.5rem] transition-all relative z-10 group">
                <X size={32} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-slate-50/20">
              {isGeneratingDigest ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <Sparkles size={32} className="absolute inset-0 m-auto text-indigo-400 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="font-extrabold text-slate-900 text-2xl tracking-tight">Synthesizing Campus Activity...</p>
                    <p className="text-slate-400 mt-2 max-w-sm mx-auto font-medium">Analyzing real-time academic feeds, placement data, and event registrations for your profile.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                   {digestContent && (
                    <div className="text-slate-800 leading-relaxed text-xl font-medium tracking-tight whitespace-pre-wrap selection:bg-indigo-100">
                      {digestContent}
                    </div>
                   )}
                </div>
              )}
            </div>

            <div className="p-10 border-t border-slate-100 bg-white flex justify-between items-center">
              <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Powered by Gemini-3 Flash Preview</span>
              <button onClick={() => setShowDigestModal(false)} className="bg-slate-900 hover:bg-indigo-700 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-slate-200 transition-all active:scale-95">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300 border border-white">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">System Preferences</h3>
                    <p className="text-slate-400 text-sm font-medium mt-1">Customize your platform experience.</p>
                 </div>
                 <button onClick={() => setShowSettings(false)} className="text-slate-300 hover:text-slate-900 p-2 hover:bg-slate-50 rounded-2xl transition-all"><X size={28}/></button>
              </div>
              <div className="space-y-8">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                    <span className="font-bold text-slate-700">Interface Theme</span>
                    <div className="flex gap-2 p-1 bg-white rounded-2xl shadow-inner">
                       <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Light</button>
                       <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-50">Dark</button>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                    <span className="font-bold text-slate-700">Real-time Sync</span>
                    <div className="w-14 h-8 bg-indigo-600 rounded-full relative cursor-pointer ring-4 ring-indigo-100 shadow-inner">
                      <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
                    <span className="font-bold text-slate-700">Native Support</span>
                    <select className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-indigo-600 border-none shadow-sm focus:ring-0">
                       <option>English</option>
                       <option>Hindi</option>
                       <option>Spanish</option>
                    </select>
                 </div>
              </div>
              <button onClick={() => setShowSettings(false)} className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-100 transition-all">Update Environment</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
