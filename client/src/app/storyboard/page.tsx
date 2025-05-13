// src/app/storyboard/page.tsx
'use client';

import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { StoryboardList } from '../../components/storyboard/StoryboardList';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function StoryboardListPage() {
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
      <StoryboardList />
    </MainLayout>
  );
}

