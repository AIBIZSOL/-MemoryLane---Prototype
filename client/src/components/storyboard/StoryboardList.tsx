// src/components/storyboard/StoryboardList.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface Storyboard {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  storyCount: number;
  createdAt: string;
}

interface StoryboardListProps {
  storyboards: Storyboard[];
}

const StoryboardList: React.FC<StoryboardListProps> = ({ storyboards }) => {
  if (storyboards.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p>You haven't created any storyboards yet.</p>
        <p className="mt-2 text-gray-600">
          A storyboard is a collection of stories and photos that tell a complete narrative.
        </p>
        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Create Your First Storyboard
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storyboards.map((storyboard) => (
        <div key={storyboard.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {storyboard.coverImage ? (
              <img 
                src={storyboard.coverImage} 
                alt={storyboard.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No cover image</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-medium mb-2">{storyboard.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{storyboard.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {storyboard.storyCount} {storyboard.storyCount === 1 ? 'story' : 'stories'}
              </span>
              <Link href={`/storyboard/${storyboard.id}`} className="text-indigo-600 hover:text-indigo-800">
                View Storyboard
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryboardList;
