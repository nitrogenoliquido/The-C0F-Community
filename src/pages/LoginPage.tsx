import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('https://backend.c0f.lol/api/auth/login', {
        username,
        password,
        code: step === '2fa' ? code : undefined
      });

      const data = res.data;

      if (data.requires2fa) {
        setStep('2fa');
      } else {
        login(data.token, data.userId, data.role, username);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl bg-surface border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Welcome back</h1>
          <p className="text-muted mt-2 text-sm">Sign in to access the community</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 'credentials' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1 ml-1 uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1 ml-1 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {step === '2fa' && (
            <div>
               <label className="block text-xs font-medium text-muted mb-1 ml-1 uppercase tracking-wider">Authenticator Code</label>
              <input 
                type="text" 
                placeholder="000 000" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                autoFocus
                required 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-[0.5em] placeholder-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                maxLength={6}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] mt-2"
          >
            {step === 'credentials' ? 'Continue' : 'Verify Login'}
          </button>
        </form>
        
        <p className="text-center mt-8 text-sm text-muted">
          No account? <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
