import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('https://backend.c0f.lol/api/auth/register', {
        username,
        email,
        password
      });

      setQrCode(res.data.setup2faQr);
      setSecret(res.data.setup2faSecret);
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-xl bg-surface border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-muted mt-2 text-sm">Join the elite community</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        {!qrCode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1 ml-1 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1 ml-1 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                placeholder="name@example.com"
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
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] mt-2"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-medium">
              Registration Successful!
            </div>
            
            <div className="bg-white p-4 rounded-lg inline-block">
              <img src={qrCode} alt="2FA QR Code" className="w-48 h-48 mix-blend-multiply" />
            </div>

            <div className="text-left bg-background/50 p-4 rounded-lg border border-white/5">
              <p className="text-xs text-muted mb-1 uppercase tracking-wider">Manual Entry Code</p>
              <code className="text-sm font-mono text-primary select-all block break-all">{secret}</code>
            </div>

            <Link to="/login">
              <button className="w-full bg-surface hover:bg-surface/80 border border-white/10 text-white font-medium py-3 rounded-lg transition-all">
                Proceed to Login
              </button>
            </Link>
          </div>
        )}
        
        {!qrCode && (
          <p className="text-center mt-8 text-sm text-muted">
            Already have an account? <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
