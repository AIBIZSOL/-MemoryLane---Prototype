// src/components/story/StoryList.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface Story {
  id: number;
  title: string;
  excerpt: string;
  lastEdited: string;
}

interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  if (stories.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p>You haven't created any stories yet.</p>
        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Create Your First Story
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
          <p className="text-gray-600 mb-4">{story.excerpt}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Last edited: {story.lastEdited}</span>
            <Link href={`/story/${story.id}`} className="text-indigo-600 hover:text-indigo-800">
              View Story
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryList;