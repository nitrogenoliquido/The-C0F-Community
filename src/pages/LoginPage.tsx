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
        login(data.token, data.userId, data.role);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1 className="rainbow-text" style={{ fontSize: '4rem', marginBottom: '20px' }}>C0F</h1>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          {step === 'credentials' && (
            <>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </>
          )}

          {step === '2fa' && (
            <>
              <p style={{ textAlign: 'center', fontSize: '0.9em' }}>Enter 2FA Code from your App</p>
              <input 
                type="text" 
                placeholder="6-digit Code" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                autoFocus
                required 
              />
            </>
          )}

          <button type="submit" style={{ width: '100%', marginTop: '20px' }}>
            {step === 'credentials' ? 'Next' : 'Verify'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8em' }}>
          Don't have an account? <Link to="/register" style={{ color: '#ff00ff' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
