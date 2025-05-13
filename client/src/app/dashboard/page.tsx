// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { DashboardService } from '@/services/dashboardService';
import ProgressCard from '@/components/dashboard/ProgressCard';
import ActivityItem from '@/components/dashboard/ActivityItem';

interface ProjectProgress {
  id: number;
  title: string;
  status: string;
  progress: number;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  status?: string;
}

export default function Dashboard() {
  const [progressItems, setProgressItems] = useState<ProjectProgress[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const data = await DashboardService.getDashboardData();
        setProgressItems(data.progressItems);
        setActivities(data.activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 flex justify-center">Loading dashboard data...</div>;
  }

  return (
    <div className="p-8">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Your Memory Project</h2>
        <div className="space-y-4">
          {progressItems.map((item) => (
            <ProgressCard
              key={item.id}
              number={item.id}
              title={item.title}
              status={item.status}
              progress={item.progress}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              type={activity.type}
              message={activity.message}
              timestamp={activity.timestamp}
              status={activity.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}