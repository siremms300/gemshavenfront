'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'member' | 'admin' | 'super-admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  totalSavings: number;
  loanEligibility: number;
  profilePicture?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');

          if (token && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password
      });
      
      const { token, user: userData, message } = response.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      toast.success(message || 'Login successful!');
      return userData;
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.map((e: any) => e.msg).join(', ');
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        password: data.password
      };

      console.log('Sending registration data:', payload);

      const response = await api.post<AuthResponse>('/auth/register', payload);
      const { token, user: userData, message } = response.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      toast.success(message || 'Registration successful!');
      return userData;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data) {
        const { data } = error.response;
        
        if (data.message) {
          errorMessage = data.message;
        }
        
        if (data.errors) {
          errorMessage = data.errors.map((e: any) => e.msg).join('\n');
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setUser(null);
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super-admin',
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