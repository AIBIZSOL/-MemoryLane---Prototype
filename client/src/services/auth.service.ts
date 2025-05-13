// src/services/auth.service.ts
import api from './api';
import { User } from '../types';
import { mockUser, delay } from '../utils/mockData';

interface AuthResponse {
  token: string;
  user: User;
}

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK = true;

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(800);
      
      // Simple validation for mock
      if (email === 'demo@example.com' && password === 'password') {
        return {
          token: 'mock-jwt-token',
          user: mockUser
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(1000);
      
      // Simple validation for mock
      if (email === 'exists@example.com') {
        throw new Error('Email already exists');
      }
      
      return {
        token: 'mock-jwt-token',
        user: {
          ...mockUser,
          name,
          email,
        }
      };
    }
    
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(500);
      
      // Check for token in localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          return mockUser;
        }
      }
      
      throw new Error('Not authenticated');
    }
    
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
};