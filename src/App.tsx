import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ThreadPage from './pages/ThreadPage';
import CategoryPage from './pages/CategoryPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Bell, AlertOctagon, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  const { username, logout, token } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (token) {
      // Poll for notifications every 60 seconds
      const checkNotifs = async () => {
        try {
          const res = await axios.get('https://backend.c0f.lol/api/notifications/count', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUnreadCount(res.data);
        } catch (e) { /* silent fail */ }
      };
      checkNotifs();
      const interval = setInterval(checkNotifs, 60000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const isActive = (path: string) => location.pathname === path 
    ? "text-primary font-semibold" 
    : "text-muted hover:text-text transition-colors";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              C0F Community
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/category/general" className={isActive('/category/general')}>General</Link>
              <Link to="/category/tech" className={isActive('/category/tech')}>Tech</Link>
              
              {username ? (
                <>
                  <Link to="/create-post" className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-all">
                    + New Post
                  </Link>
                  
                  {/* Notifications */}
                  <div className="relative cursor-pointer group">
                    <Bell size={20} className="text-muted group-hover:text-white transition-colors" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border border-background">
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                    <span className="text-sm text-text font-medium">{username}</span>
                    <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4 ml-4">
                  <Link to="/login" className="text-text hover:text-white transition-colors">Login</Link>
                  <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/25">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function SystemGuard({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<'CHECKING' | 'ONLINE' | 'OFFLINE'>('CHECKING');

    useEffect(() => {
        const checkHealth = async () => {
            try {
                await axios.get('https://backend.c0f.lol/api/public/status', { timeout: 5000 });
                setStatus('ONLINE');
            } catch (error) {
                setStatus('OFFLINE');
            }
        };
        checkHealth();
    }, []);

    if (status === 'CHECKING') {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
                <RefreshCw className="animate-spin text-primary" size={48} />
                <p className="text-muted font-mono text-sm tracking-widest">ESTABLISHING SECURE CONNECTION...</p>
            </div>
        );
    }

    if (status === 'OFFLINE') {
        return (
            <div className="min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center relative font-sans select-none">
                
                {/* Space Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>
                    {/* Stars */}
                    {Array.from({length: 50}).map((_, i) => (
                        <div key={i} className="absolute bg-white rounded-full opacity-0 animate-pulse" 
                             style={{
                                 top: `${Math.random() * 100}%`, 
                                 left: `${Math.random() * 100}%`,
                                 width: `${Math.random() * 2 + 1}px`,
                                 height: `${Math.random() * 2 + 1}px`,
                                 animationDuration: `${Math.random() * 3 + 2}s`
                             }}
                        ></div>
                    ))}
                </div>

                {/* Content */}
                <div className="z-10 flex flex-col items-center text-center space-y-12">
                    
                    {/* Satellite Animation */}
                    <div className="relative">
                        {/* Earth */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 shadow-[0_0_50px_rgba(37,99,235,0.3)] relative z-10 flex items-center justify-center border border-blue-500/20">
                            <div className="w-full h-full opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png')] bg-cover bg-center rounded-full"></div>
                        </div>

                        {/* Orbit Path */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full z-0"></div>

                        {/* Satellite */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] animate-spin-slow-reverse z-20 pointer-events-none">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                                    <AlertOctagon className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" size={32} />
                                </div>
                             </div>
                        </div>

                        {/* Connection Line */}
                        <div className="absolute top-1/2 left-1/2 w-0.5 h-24 bg-gradient-to-b from-red-500/0 via-red-500/50 to-blue-500/50 -translate-x-1/2 -translate-y-full origin-bottom rotate-45 opacity-20"></div>
                    </div>

                    <div className="space-y-4 max-w-md px-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Connection Lost
                        </h1>
                        <p className="text-red-400 font-mono text-sm uppercase tracking-widest border border-red-900/30 bg-red-500/5 py-2 px-4 rounded">
                            Error trying to communicate to the backend
                        </p>
                    </div>

                    <button 
                        onClick={() => window.location.reload()} 
                        className="group relative px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        <span className="flex items-center gap-2">
                            <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={18} />
                            RETRY CONNECTION
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SystemGuard>
            <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="/thread/:postId" element={<ThreadPage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                </Routes>
            </main>
            </div>
        </SystemGuard>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;