// src/app/storyboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StoryboardList from '@/components/storyboard/StoryboardList';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { StoryboardService } from '@/services/storyboardService';

export default function StoryboardPage() {
  const [storyboards, setStoryboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    async function fetchStoryboards() {
      try {
        const data = await StoryboardService.getStoryboards();
        setStoryboards(data);
      } catch (error) {
        console.error('Error fetching storyboards:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoryboards();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex justify-center">Loading storyboards...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Storyboards</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Create New Storyboard
          </button>
        </div>
        <StoryboardList storyboards={storyboards} />
      </div>
    </MainLayout>
  );
}