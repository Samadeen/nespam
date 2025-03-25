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
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  tin: string;
  user_type: string;
  date_registered: string;
  registration_status: string;
  login_status: string;
  account_status: string;
  email_verification_code: string;
  email_verification_status: string;
  session_id: string;
  session_status: string;
  activities: string;
  created_at: string;
  updated_at: string;
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

interface LoginPayload {
  user_id: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user_info: User;
  session_id: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
  confirm_password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (payload: SignUpPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
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
      const storedUserInfo =
        typeof window !== 'undefined'
          ? localStorage.getItem('user_info')
          : null;

      if (token && storedUserInfo) {
        const userData = JSON.parse(storedUserInfo) as User;
        setUser(userData);

        try {
          const verifiedData = await api.get<User>('/auth/verify');
          setUser(verifiedData);
        } catch (verifyErr) {
          console.error('Token verification failed:', verifyErr);
        }
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      toast.error('Authentication failed');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      localStorage.removeItem('session_id');
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
      toast.success('Account created successfully');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    }
  };

  const login = async (payload: LoginPayload) => {
    try {
      setError(null);
      const response = await api.post<LoginResponse>('/user-login', payload);

      localStorage.setItem('user_info', JSON.stringify(response.user_info));
      localStorage.setItem('session_id', response.session_id);
      localStorage.setItem('auth_token', response.session_id);

      setUser(response.user_info);
      toast.success(response.message);
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
      localStorage.removeItem('user_info');
      localStorage.removeItem('session_id');

      setUser(null);
      toast.success('Logout successful');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await api.post('/api/forgot-user-password', { email });
      toast.success('Reset email sent successfully');
      router.push('/reset-password');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
      );
      throw err;
    }
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    try {
      setError(null);
      await api.post('/auth/reset-password', payload);
      toast.success('Password reset successful');
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
