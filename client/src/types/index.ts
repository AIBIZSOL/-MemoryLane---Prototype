// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'in_progress' | 'completed';
  progress: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Storyboard {
  id: string;
  title: string;
  description: string;
  status: 'waiting' | 'in_progress' | 'completed';
  storyId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  fileName: string;
  storyId?: string;
  storyboardId?: string;
  userId: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'upload' | 'update' | 'create' | 'review';
  message: string;
  userId: string;
  relatedId?: string;
  relatedType?: 'story' | 'storyboard' | 'media' | 'video';
  createdAt: string;
}

export interface ProjectProgress {
  storyCreation: {
    status: 'pending' | 'in_progress' | 'completed';
    progress: number;
  };
  storyboardCreation: {
    status: 'waiting' | 'in_progress' | 'completed';
  };
  videoCreation: {
    status: 'future' | 'in_progress' | 'completed';
  };
}