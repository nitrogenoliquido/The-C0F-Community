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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1 className="rainbow-text" style={{ fontSize: '4rem', marginBottom: '20px' }}>C0F</h1>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '8px', width: '350px' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        {!qrCode ? (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" style={{ width: '100%', marginTop: '20px' }}>Register</button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#00ff00' }}>Registration Successful!</h3>
            <p>Scan this QR code with Google Authenticator or Authy:</p>
            <div style={{ background: 'white', padding: '10px', display: 'inline-block' }}>
              <img src={qrCode} alt="2FA QR Code" width="200" />
            </div>
            <p style={{ fontSize: '0.8em', wordBreak: 'break-all' }}>Secret: {secret}</p>
            <Link to="/login">
              <button style={{ width: '100%', marginTop: '20px' }}>Proceed to Login</button>
            </Link>
          </div>
        )}
        
        {!qrCode && (
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8em' }}>
            Already have an account? <Link to="/login" style={{ color: '#ff00ff' }}>Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
