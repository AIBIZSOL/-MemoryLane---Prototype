// src/services/auth.service.ts
import { mockUser } from '@/utils/mockData';

// Toggle between mock data and real API
const USE_MOCK = true;

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthResponse {
  user: User;
  token?: string;
}

// Export as a named export
export const AuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, check against hardcoded credentials
      if (email === 'demo@example.com' && password === 'password') {
        return {
          user: mockUser,
          token: 'mock-jwt-token'
        };
      } else {
        // Instead of throwing an error, return a rejected promise with a more informative message
        return Promise.reject({ message: 'Invalid email or password' });
      }
    } else {
      try {
        // Real API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          return Promise.reject(errorData);
        }
        
        return await response.json();
      } catch (error) {
        return Promise.reject({ message: 'An error occurred during login' });
      }
    }
  },

  logout: async (): Promise<{ success: boolean }> => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } else {
      try {
        // Real API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) {
          return Promise.reject({ message: 'Logout failed' });
        }
        
        return await response.json();
      } catch (error) {
        return Promise.reject({ message: 'An error occurred during logout' });
      }
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, always return the mock user
      return mockUser;
    } else {
      try {
        // Real API call
        const token = localStorage.getItem('token');
        if (!token) {
          return null;
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          return null;
        }
        
        return await response.json();
      } catch (error) {
        return null;
      }
    }
  }
};

// Also export as default for flexibility
export default AuthService;