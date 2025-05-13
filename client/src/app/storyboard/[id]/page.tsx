"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { StoryService } from '@/services/storyService';

interface StoryDetailPageProps {
  params: {
    id: string;
  };
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    async function fetchStory() {
      try {
        const data = await StoryService.getStoryById(id);
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [id, isAuthenticated, router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex justify-center">Loading story...</div>
      </MainLayout>
    );
  }

  if (!story) {
    return (
      <MainLayout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Story Not Found</h1>
          <p>The story you are looking for does not exist.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-6">
          <button className="text-indigo-600 hover:text-indigo-800" onClick={() => router.push('/story')}>
            ← Back to Stories
          </button>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>Created: {story.createdAt}</span>
            <span className="mx-2">•</span>
            <span>Last edited: {story.lastEdited}</span>
          </div>
          <div className="prose max-w-none">
            {story.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-4">
              Edit Story
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">
              Create Storyboard
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}