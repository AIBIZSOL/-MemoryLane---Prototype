// src/components/common/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'bg-primary-500',
  height = 4,
  className = '',
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div
        className={`${color} transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%`, height: '100%' }}
      ></div>
    </div>
  );
};

// src/components/common/Badge.tsx
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};