// src/app/story/new/page.tsx
'use client';

import React from 'react';
import { MainLayout } from '../../../components/layout/MainLayout';
import { StoryEditor } from '../../../components/story/StoryEditor';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function NewStoryPage() {
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
    // Redirect to story list after saving
    router.push('/story');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Story</h1>
        <p className="text-gray-600">Tell us about your school memories</p>
      </div>
      <StoryEditor onSave={handleSave} />
    </MainLayout>
  );
}