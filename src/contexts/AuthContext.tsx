import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users, type User } from '@/data/users';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, remember: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'soporte-local-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (username: string, password: string, remember: boolean): boolean => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const userWithLogin = { ...found, lastLogin: new Date().toISOString() };
      setUser(userWithLogin);
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY, JSON.stringify(userWithLogin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
