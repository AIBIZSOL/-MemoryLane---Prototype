// src/components/layout/MainLayout.tsx
"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockUser } from '@/utils/mockData';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Story', path: '/story' },
    { name: 'Storyboard', path: '/storyboard' },
    { name: 'Upload Photos', path: '/upload' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-indigo-600 text-2xl font-bold">
            Memory Lane: School Days
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {mockUser.name}</span>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
              {mockUser.avatar}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`py-4 px-1 text-gray-700 hover:text-indigo-600 border-b-2 ${
                    isActive ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;