// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { ProjectProgress } from '../../components/dashboard/ProjectProgress';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Loading state is handled in MainLayout
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectProgress />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </MainLayout>
  );
}
