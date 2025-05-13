// src/services/dashboardService.ts
import { mockDashboardData } from '@/utils/mockData';

// Toggle between mock data and real API
const USE_MOCK = true;

interface DashboardData {
  progressItems: Array<{
    id: number;
    title: string;
    status: string;
    progress: number;
  }>;
  activities: Array<{
    id: number;
    type: string;
    message: string;
    timestamp: string;
    status?: string;
  }>;
}

export const DashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDashboardData;
    } else {
      // Real API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return await response.json();
    }
  }
};