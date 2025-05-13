// src/services/storyboard.service.ts
import api from './api';
import { Storyboard } from '../types';
import { mockStoryboards, delay } from '../utils/mockData';

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK = true;

export const storyboardService = {
  getStoryboards: async (): Promise<Storyboard[]> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(800);
      return [...mockStoryboards];
    }
    
    const response = await api.get('/storyboard');
    return response.data;
  },
  
  getStoryboard: async (id: string): Promise<Storyboard> => {
    if (USE_MOCK) {
      await delay(500);
      const storyboard = mockStoryboards.find(s => s.id === id);
      if (storyboard) {
        return { ...storyboard };
      }
      throw new Error('Storyboard not found');
    }
    
    const response = await api.get(`/storyboard/${id}`);
    return response.data;
  },
  
  createStoryboard: async (data: Partial<Storyboard>): Promise<Storyboard> => {
    if (USE_MOCK) {
      await delay(1000);
      
      if (!data.storyId) {
        throw new Error('Story ID is required');
      }
      
      const newStoryboard: Storyboard = {
        id: `storyboard${mockStoryboards.length + 1}`,
        title: data.title || 'Untitled Storyboard',
        description: data.description || '',
        status: data.status || 'waiting',
        storyId: data.storyId,
        userId: 'user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, we would add this to mockStoryboards
      // mockStoryboards.push(newStoryboard);
      
      return newStoryboard;
    }
    
    const response = await api.post('/storyboard', data);
    return response.data;
  },
  
  updateStoryboard: async (id: string, data: Partial<Storyboard>): Promise<Storyboard> => {
    if (USE_MOCK) {
      await delay(800);
      const storyboardIndex = mockStoryboards.findIndex(s => s.id === id);
      
      if (storyboardIndex === -1) {
        throw new Error('Storyboard not found');
      }
      
      const updatedStoryboard = {
        ...mockStoryboards[storyboardIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, we would update mockStoryboards
      // mockStoryboards[storyboardIndex] = updatedStoryboard;
      
      return updatedStoryboard;
    }
    
    const response = await api.put(`/storyboard/${id}`, data);
    return response.data;
  },
  
  deleteStoryboard: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      const storyboardIndex = mockStoryboards.findIndex(s => s.id === id);
      
      if (storyboardIndex === -1) {
        throw new Error('Storyboard not found');
      }
      
      // In a real app, we would remove from mockStoryboards
      // mockStoryboards.splice(storyboardIndex, 1);
      
      return;
    }
    
    await api.delete(`/storyboard/${id}`);
  },
};