"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StoryList from '@/components/story/StoryList';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { storyService } from '@/services/storyService';

export default function StoryPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    async function fetchStories() {
      try {
        const data = await StoryService.getStories();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex justify-center">Loading stories...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Stories</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Create New Story
          </button>
        </div>
        <StoryList stories={stories} />
      </div>
    </MainLayout>
  );
}