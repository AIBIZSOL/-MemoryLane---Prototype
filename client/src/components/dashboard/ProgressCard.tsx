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
    return 'bg-gray-100';
  };

  // Determine the circle background color
  const getCircleBgColor = () => {
    if (progress > 0) return 'bg-blue-100 text-blue-700';
    if (status === 'waiting') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-200 text-gray-700';
  };

  // Determine the status label text
  const getStatusText = () => {
    if (status === 'in progress') return `In Progress (${progress}%)`;
    if (status === 'waiting') return 'Waiting for story';
    return 'Future phase';
  };

  return (
    <div className={`rounded-lg p-6 ${getBgColor()}`}>
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 ${getCircleBgColor()} rounded-full flex items-center justify-center mr-4`}>
          <span className="text-lg font-medium">{number}</span>
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-600">{getStatusText()}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressCard;
