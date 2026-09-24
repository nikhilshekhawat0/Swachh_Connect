import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers, User } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  register: (userData: Partial<User>) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('swachhconnect_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch { /* ignore */ }
  }, []);

  const login = (email: string, password: string) => {
    const allUsers = [...mockUsers];
    try {
      const savedUsers = localStorage.getItem('swachhconnect_users');
      if (savedUsers) allUsers.push(...JSON.parse(savedUsers));
    } catch { /* ignore */ }

    const user = allUsers.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    if (user.status === 'inactive') return { success: false, error: 'Account is inactive' };

    setCurrentUser(user);
    localStorage.setItem('swachhconnect_user', JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('swachhconnect_user');
  };

  const register = (userData: Partial<User>) => {
    const allUsers = [...mockUsers];
    try {
      const savedUsers = localStorage.getItem('swachhconnect_users');
      if (savedUsers) allUsers.push(...JSON.parse(savedUsers));
    } catch { /* ignore */ }

    if (allUsers.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      password: userData.password || '',
      role: 'citizen',
      address: userData.address || '',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      points: 0,
      badges: ['First Report'],
    };

    try {
      const savedUsers = JSON.parse(localStorage.getItem('swachhconnect_users') || '[]');
      savedUsers.push(newUser);
      localStorage.setItem('swachhconnect_users', JSON.stringify(savedUsers));
    } catch { /* ignore */ }

    setCurrentUser(newUser);
    localStorage.setItem('swachhconnect_user', JSON.stringify(newUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
