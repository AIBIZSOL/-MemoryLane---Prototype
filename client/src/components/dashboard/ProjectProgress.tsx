// src/components/dashboard/ProjectProgress.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { ProjectProgress as ProjectProgressType } from '../../types';
import { projectService } from '../../services';

interface ProgressItemProps {
  number: number;
  title: string;
  status: string;
  progress: number;
  color: string;
  bgColor: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  number,
  title,
  status,
  progress,
  color,
  bgColor,
}) => {
  return (
    <Card className={`${bgColor} transition-colors`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${color} text-white flex items-center justify-center mr-4`}>
          {number}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{status}</p>
          <ProgressBar progress={progress} color={color} />
        </div>
      </div>
    </Card>
  );
};

export const ProjectProgress: React.FC = () => {
  const [progress, setProgress] = useState<ProjectProgressType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await projectService.getProjectProgress();
        setProgress(data);
      } catch (error) {
        console.error('Failed to fetch project progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <h2 className="text-xl font-semibold mb-4 bg-gray-200 h-8 w-40 rounded"></h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg">
              <div className="bg-gray-200 h-6 w-32 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-24 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!progress) {
    return <div>Failed to load project progress.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Memory Project</h2>

      <div className="space-y-4">
        {/* Story Creation */}
        <ProgressItem
          number={1}
          title="Story Creation"
          status={progress.storyCreation.status === 'in_progress' ? 'In Progress (75%)' : progress.storyCreation.status}
          progress={progress.storyCreation.progress}
          color={progress.storyCreation.status === 'completed' ? 'bg-green-500' : 'bg-primary-500'}
          bgColor={progress.storyCreation.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}
        />

        {/* Storyboard Creation */}
        <ProgressItem
          number={2}
          title="Storyboard Creation"
          status={progress.storyboardCreation.status === 'waiting' ? 'Waiting for story' : progress.storyboardCreation.status}
          progress={progress.storyboardCreation.status === 'waiting' ? 0 : 100}
          color={
            progress.storyboardCreation.status === 'completed'
              ? 'bg-green-500'
              : progress.storyboardCreation.status === 'in_progress'
              ? 'bg-primary-500'
              : 'bg-gray-300'
          }
          bgColor={
            progress.storyboardCreation.status === 'completed'
              ? 'bg-green-100'
              : progress.storyboardCreation.status === 'in_progress'
              ? 'bg-blue-100'
              : 'bg-yellow-100'
          }
        />

        {/* Video Creation */}
        <ProgressItem
          number={3}
          title="Video Creation"
          status={progress.videoCreation.status === 'future' ? 'Future phase' : progress.videoCreation.status}
          progress={progress.videoCreation.status === 'future' ? 0 : 100}
          color={
            progress.videoCreation.status === 'completed'
              ? 'bg-green-500'
              : progress.videoCreation.status === 'in_progress'
              ? 'bg-primary-500'
              : 'bg-gray-300'
          }
          bgColor={
            progress.videoCreation.status === 'completed'
              ? 'bg-green-100'
              : progress.videoCreation.status === 'in_progress'
              ? 'bg-blue-100'
              : 'bg-gray-100'
          }
        />
      </div>
    </div>
  );
};
