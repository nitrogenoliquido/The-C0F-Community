import React, { createContext, useContext, useState } from 'react';

interface AuthState {
  token: string | null;
  userId: number | null;
  role: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, userId: number, role: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
    role: localStorage.getItem('role'),
    username: localStorage.getItem('username'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = (token: string, userId: number, role: string, username: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    setAuth({ token, userId, role, username, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setAuth({ token: null, userId: null, role: null, username: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};