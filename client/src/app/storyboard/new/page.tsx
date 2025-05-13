// src/app/storyboard/new/page.tsx
'use client';

import React from 'react';
import { MainLayout } from '../../../components/layout/MainLayout';
import { StoryboardEditor } from '../../../components/storyboard/StoryboardEditor';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function NewStoryboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  const handleSave = () => {
    // Redirect to storyboard list after saving
    router.push('/storyboard');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Storyboard</h1>
        <p className="text-gray-600">Layout the visual journey of your school memories</p>
      </div>
      <StoryboardEditor onSave={handleSave} />
    </MainLayout>
  );
}