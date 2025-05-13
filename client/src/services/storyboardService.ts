// src/services/storyboardService.ts
import { mockStoryboards } from '@/utils/mockData';

// Toggle between mock data and real API
const USE_MOCK = true;

export const StoryboardService = {
  getStoryboards: async () => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStoryboards;
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards`);
      if (!response.ok) {
        throw new Error('Failed to fetch storyboards');
      }
      return await response.json();
    }
  },

  getStoryboardById: async (id: string) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStoryboards.find(storyboard => storyboard.id.toString() === id) || null;
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch storyboard');
      }
      return await response.json();
    }
  },

  createStoryboard: async (storyboardData) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, we would add the new storyboard to the mock data
      return { id: Date.now(), ...storyboardData, createdAt: new Date().toISOString() };
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyboardData),
      });
      if (!response.ok) {
        throw new Error('Failed to create storyboard');
      }
      return await response.json();
    }
  },

  updateStoryboard: async (id: string, storyboardData) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, we would update the storyboard in the mock data
      return { id, ...storyboardData, updatedAt: new Date().toISOString() };
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyboardData),
      });
      if (!response.ok) {
        throw new Error('Failed to update storyboard');
      }
      return await response.json();
    }
  },

  deleteStoryboard: async (id: string) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, we would remove the storyboard from the mock data
      return { success: true };
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete storyboard');
      }
      return await response.json();
    }
  },

  addStoryToStoryboard: async (storyboardId: string, storyId: string) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, we would add the story to the storyboard in the mock data
      return { success: true };
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards/${storyboardId}/stories/${storyId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to add story to storyboard');
      }
      return await response.json();
    }
  },

  removeStoryFromStoryboard: async (storyboardId: string, storyId: string) => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, we would remove the story from the storyboard in the mock data
      return { success: true };
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/storyboards/${storyboardId}/stories/${storyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove story from storyboard');
      }
      return await response.json();
    }
  }
};
