// src/services/project.service.ts
import api from './api';
import { ProjectProgress } from '../types';
import { mockProjectProgress, delay } from '../utils/mockData';

// Flag to use mock data (set to false when backend is ready)
const USE_MOCK = true;

export const projectService = {
  getProjectProgress: async (): Promise<ProjectProgress> => {
    if (USE_MOCK) {
      // Simulate API delay
      await delay(800);
      return { ...mockProjectProgress };
    }
    
    const response = await api.get('/customer/project-progress');
    return response.data;
  },
};