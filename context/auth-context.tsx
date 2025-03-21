'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  user_type: string;
  phone_number: string;
  tin: string;
  created_by: string;
}

interface SignUpPayload {
  user_type: string;
  name: string;
  email: string;
  phone_number: string;
  tin: string;
  password: string;
  created_by: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (payload: SignUpPayload) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token')
          : null;
      if (token) {
        const userData = await api.get<User>('/auth/verify');
        setUser(userData);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    try {
      setError(null);
      const data = await api.post<{ user: User; token: string }>(
        '/registration',
        payload
      );
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await api.post<{ user: User; token: string }>(
        '/auth/login',
        {
          email,
          password,
        }
      );
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await api.post('/auth/forgot-password', { email });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
      );
      throw err;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setError(null);
      await api.post('/auth/reset-password', { token, newPassword });
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    login,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
