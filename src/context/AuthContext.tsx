import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthState {
  token: string | null;
  userId: number | null;
  role: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, userId: number, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
    role: localStorage.getItem('role'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = (token: string, userId: number, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('role', role);
    setAuth({ token, userId, role, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setAuth({ token: null, userId: null, role: null, isAuthenticated: false });
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
