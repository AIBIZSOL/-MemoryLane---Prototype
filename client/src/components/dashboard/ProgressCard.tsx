// src/components/dashboard/ProgressCard.tsx
import React from 'react';

interface ProgressCardProps {
  number: number;
  title: string;
  status: string;
  progress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ number, title, status, progress }) => {
  // Determine the background color based on the progress state
  const getBgColor = () => {
    if (progress > 0) return 'bg-blue-50';
    if (status === 'waiting') return 'bg-yellow-50';
    return 'bg-gray-50';
  };

  // Determine the circle background color
  const getCircleBgColor = () => {
    if (progress > 0) return 'bg-blue-100';
    if (status === 'waiting') return 'bg-yellow-100';
    return 'bg-gray-200';
  };

  return (
    <div className={`rounded-lg p-6 ${getBgColor()}`}>
      <div className="flex items-center mb-2">
        <div className={`w-10 h-10 ${getCircleBgColor()} rounded-full flex items-center justify-center mr-4`}>
          <span className="text-lg font-medium">{number}</span>
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-600">
            {status === 'in progress' 
              ? `In Progress (${progress}%)` 
              : status === 'waiting' 
                ? 'Waiting for story' 
                : 'Future phase'}
          </p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCard;