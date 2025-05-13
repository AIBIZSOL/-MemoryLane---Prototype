// src/services/story.Service.ts
import api from './api';
import { Story } from '../types';
import { mockStories, delay } from '../utils/mockData';

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK = true;

export const storyService = {
  getStories: async ()=> {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStories;
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`);
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      return await response.json();
    }
  },
  
  getStory: async (id: string): Promise<Story> => {
    if (USE_MOCK) {
      await delay(500);
      const story = mockStories.find(s => s.id === id);
      if (story) {
        return { ...story };
      }
      throw new Error('Story not found');
    }
    
    const response = await api.get(`/story/${id}`);
    return response.data;
  },
  
  getStoryById: async (id: string) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStories.find(story => story.id.toString() === id) || null;
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch story');
      }
      return await response.json();
    }
  },

  createStory: async (data: Partial<Story>): Promise<Story> => {
    if (USE_MOCK) {
      await delay(1000);
      const newStory: Story = {
        id: `story${mockStories.length + 1}`,
        title: data.title || 'Untitled Story',
        content: data.content || '',
        status: data.status || 'draft',
        progress: data.progress || 0,
        userId: 'user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, we would add this to mockStories
      // mockStories.push(newStory);
      
      return newStory;
    }
    
    const response = await api.post('/story', data);
    return response.data;
  },
  
  updateStory: async (id: string, data: Partial<Story>): Promise<Story> => {
    if (USE_MOCK) {
      await delay(800);
      const storyIndex = mockStories.findIndex(s => s.id === id);
      
      if (storyIndex === -1) {
        throw new Error('Story not found');
      }
      
      const updatedStory = {
        ...mockStories[storyIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, we would update mockStories
      // mockStories[storyIndex] = updatedStory;
      
      return updatedStory;
    }
    
    const response = await api.put(`/story/${id}`, data);
    return response.data;
  },
  
  deleteStory: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      const storyIndex = mockStories.findIndex(s => s.id === id);
      
      if (storyIndex === -1) {
        throw new Error('Story not found');
      }
      
      // In a real app, we would remove from mockStories
      // mockStories.splice(storyIndex, 1);
      
      return;
    }
    
    await api.delete(`/story/${id}`);
  },
};
