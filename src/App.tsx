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
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 space-y-6 p-8 text-center">
                <AlertOctagon size={80} className="animate-pulse" />
                <div>
                    <h1 className="text-4xl font-bold mb-2 tracking-tighter">SYSTEM CRITICAL</h1>
                    <p className="text-red-400/60 font-mono">CONNECTION TO MAINFRAME LOST. PROTOCOL SUSPENDED.</p>
                </div>
                <div className="max-w-md bg-red-900/10 border border-red-500/20 p-4 rounded text-sm font-mono text-left w-full">
                    <p>{'>'} PING backend.c0f.lol... <span className="text-red-500">TIMEOUT</span></p>
                    <p>{'>'} RETRY CONNECTION... <span className="text-red-500">FAILED</span></p>
                    <p className="animate-pulse mt-2">{'>'} WAITING FOR RECOVERY_</p>
                </div>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/50 rounded transition-colors uppercase font-bold tracking-widest text-sm">
                    Retry Connection
                </button>
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