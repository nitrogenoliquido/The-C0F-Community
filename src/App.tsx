import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ThreadPage from './pages/ThreadPage';
import CategoryPage from './pages/CategoryPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Bell, RefreshCw } from 'lucide-react';
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

    // Snake Game Hook & Logic
    const [snake, setSnake] = useState([[0,0], [1,0]]);
    const [food, setFood] = useState([5,5]);
    const [dir, setDir] = useState([1,0]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (status !== 'OFFLINE') return;
        
        // Key Listener for 'R' and Game Controls
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'r') window.location.reload();
            
            // Snake Controls
            switch(e.key) {
                case 'ArrowUp': if(dir[1]===0) setDir([0,-1]); break;
                case 'ArrowDown': if(dir[1]===0) setDir([0,1]); break;
                case 'ArrowLeft': if(dir[0]===0) setDir([-1,0]); break;
                case 'ArrowRight': if(dir[0]===0) setDir([1,0]); break;
            }
        };
        window.addEventListener('keydown', handleKeys);
        
        // Game Loop
        const moveSnake = () => {
            if (gameOver) return;
            setSnake(prev => {
                const newHead = [prev[prev.length-1][0] + dir[0], prev[prev.length-1][1] + dir[1]];
                // Wall Collision (Wrap around or Die - Let's wrap for endless fun)
                if (newHead[0] >= 20) newHead[0] = 0;
                if (newHead[0] < 0) newHead[0] = 19;
                if (newHead[1] >= 20) newHead[1] = 0;
                if (newHead[1] < 0) newHead[1] = 19;

                // Self Collision
                if (prev.some(s => s[0] === newHead[0] && s[1] === newHead[1])) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [...prev, newHead];
                if (newHead[0] === food[0] && newHead[1] === food[1]) {
                    setFood([Math.floor(Math.random()*20), Math.floor(Math.random()*20)]);
                } else {
                    newSnake.shift();
                }
                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, 100);
        return () => {
            window.removeEventListener('keydown', handleKeys);
            clearInterval(gameInterval);
        };
    }, [status, dir, food, gameOver]);

    if (status === 'OFFLINE') {
        return (
            <div className="min-h-screen bg-[#111] text-[#d1d5db] font-sans flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl w-full space-y-8">
                    {/* Header */}
                    <div className="border-b border-white/10 pb-6">
                        <h1 className="text-3xl font-light mb-2">Backend Connection Failed</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Error 521: Web Server is Down
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-4">
                        <p className="text-lg">
                            The browser was able to connect to the frontend, but the backend API is unreachable.
                        </p>
                        <div className="bg-[#000] p-4 rounded border border-white/5 font-mono text-xs text-gray-400">
                            <p>{'>'} GET https://backend.c0f.lol/api/public/status</p>
                            <p className="text-red-400">{'>'} ERR_CONNECTION_TIMED_OUT</p>
                        </div>
                        <p className="text-sm text-gray-500">
                            Press <kbd className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">R</kbd> to retry connection.
                        </p>
                    </div>

                    {/* Mini Game */}
                    <div className="mt-12">
                        <p className="text-xs text-center mb-2 text-gray-600 uppercase tracking-widest">Waiting Room • High Score: {snake.length - 2}</p>
                        <div className="w-[300px] h-[300px] mx-auto bg-black border border-white/10 grid grid-cols-20 grid-rows-20 relative">
                            {gameOver && (
                                <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col z-10">
                                    <span className="text-red-500 font-bold mb-2">GAME OVER</span>
                                    <button onClick={() => {setSnake([[0,0],[1,0]]); setGameOver(false);}} className="text-xs border border-white/20 px-2 py-1 hover:bg-white/10">Restart</button>
                                </div>
                            )}
                            {/* Food */}
                            <div className="bg-primary" style={{ gridColumn: food[0]+1, gridRow: food[1]+1 }}></div>
                            {/* Snake */}
                            {snake.map((s, i) => (
                                <div key={i} className={`${i === snake.length-1 ? 'bg-white' : 'bg-gray-500'}`} style={{ gridColumn: s[0]+1, gridRow: s[1]+1 }}></div>
                            ))}
                        </div>
                        <p className="text-[10px] text-center mt-2 text-gray-700">Use Arrow Keys to Play</p>
                    </div>

                    {/* Footer */}
                    <div className="pt-8 border-t border-white/5 flex justify-between text-[10px] text-gray-600 font-mono">
                        <span>Ray ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                        <span>IP: Dynamic</span>
                        <span>C0F Security Network</span>
                    </div>
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