import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ThreadPage from './pages/ThreadPage';
import CategoryPage from './pages/CategoryPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function Navbar() {
  const { username, logout } = useAuth();
  const location = useLocation();

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
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/category/general" className={isActive('/category/general')}>General</Link>
              <Link to="/category/tech" className={isActive('/category/tech')}>Tech</Link>
              
              {username ? (
                <>
                  <Link to="/create-post" className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-all">
                    + New Post
                  </Link>
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;