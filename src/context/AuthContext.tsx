'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  program: string;
  week: number;
  goal: string;
  weight: number;
  height: number;
  dailyCalories: number;
  avatar: string;
  plan: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  name: 'Alex',
  email: 'demo@elevatefitness.com',
  program: 'Body Transformation',
  week: 7,
  goal: 'Build Muscle & Lose Fat',
  weight: 82.4,
  height: 178,
  dailyCalories: 2420,
  avatar: 'A',
  plan: 'Premium · 4 months left',
  joinDate: 'Sep 2025',
};

const TEST_CREDENTIALS = {
  email: 'demo@elevatefitness.com',
  password: 'Elevate@123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    const isValid =
      normalizedEmail === TEST_CREDENTIALS.email &&
      password === TEST_CREDENTIALS.password;
    if (isValid) {
      setUser({ ...DEMO_USER, email: normalizedEmail });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
