// src/services/media.service.ts
import api from './api';
import { Media } from '../types';
import { mockMedia, delay } from '../utils/mockData';

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK = true;

export const mediaService = {
  getMediaFiles: async (): Promise<Media[]> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(800);
      return [...mockMedia];
    }
    
    const response = await api.get('/media');
    return response.data;
  },
  
  getMediaByStory: async (storyId: string): Promise<Media[]> => {
    if (USE_MOCK) {
      await delay(500);
      return mockMedia.filter(media => media.storyId === storyId);
    }
    
    const response = await api.get(`/media/story/${storyId}`);
    return response.data;
  },
  
  uploadMedia: async (formData: FormData): Promise<Media> => {
    if (USE_MOCK) {
      await delay(1500); // Longer delay to simulate upload time
      
      // Extract storyId from formData
      const storyId = formData.get('storyId') as string;
      
      if (!storyId) {
        throw new Error('Story ID is required');
      }
      
      // Create a mock media entry
      const newMedia: Media = {
        id: `media${mockMedia.length + 1}`,
        url: 'https://via.placeholder.com/600x400?text=Uploaded+Photo',
        type: 'image',
        fileName: 'uploaded_photo.jpg',
        storyId,
        userId: 'user1',
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, we would add this to mockMedia
      // mockMedia.push(newMedia);
      
      return newMedia;
    }
    
    const response = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  deleteMedia: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(500);
      const mediaIndex = mockMedia.findIndex(m => m.id === id);
      
      if (mediaIndex === -1) {
        throw new Error('Media not found');
      }
      
      // In a real app, we would remove from mockMedia
      // mockMedia.splice(mediaIndex, 1);
      
      return;
    }
    
    await api.delete(`/media/${id}`);
  },
};