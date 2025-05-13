// src/app/story/page.tsx
'use client';

import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { StoryList } from '../../components/story/StoryList';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function StoryListPage() {
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
      <StoryList />
    </MainLayout>
  );
}

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

// src/app/story/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../../components/layout/MainLayout';
import { StoryEditor } from '../../../components/story/StoryEditor';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { storyService } from '../../services';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditStoryPage({ params }: PageProps) {
  const { id } = params;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if story exists and belongs to user
  useEffect(() => {
    if (!loading && user) {
      storyService
        .getStory(id)
        .then(() => {
          setPageLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch story:', err);
          setError('Story not found or you do not have permission to edit it.');
          setPageLoading(false);
        });
    }
  }, [id, user, loading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || pageLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 text-red-500 p-6 rounded">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/story')}
            className="mt-4 text-primary-500 hover:text-primary-600"
          >
            Return to Stories
          </button>
        </div>
      </MainLayout>
    );
  }

  const handleSave = () => {
    // Redirect to story list after saving
    router.push('/story');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Story</h1>
        <p className="text-gray-600">Update your school memories</p>
      </div>
      <StoryEditor storyId={id} onSave={handleSave} />
    </MainLayout>
  );
}
