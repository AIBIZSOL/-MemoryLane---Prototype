'use client';
// src/app/upload/page.tsx

import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { PhotoUploader } from '../../components/upload/PhotoUploader';
import { PhotoGallery } from '../../components/upload/PhotoGallery';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Loading state is handled in MainLayout
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Photo Management</h1>
        <p className="text-gray-600">Upload and manage photos for your school memories</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <PhotoUploader />
        <PhotoGallery />
      </div>
    </MainLayout>
  );
}
