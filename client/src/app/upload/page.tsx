// src/app/upload/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UploadPhotosPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would be replaced with actual API call in production
    console.log('Files to upload:', selectedFiles);
    
    setUploading(false);
    setUploadSuccess(true);
    setSelectedFiles([]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Photos</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <p className="mb-4">
          Upload photos from your school days to include in your stories and storyboards.
        </p>
        
        <form onSubmit={handleUpload}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Select Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Browse Photos
              </label>
              <p className="mt-2 text-sm text-gray-500">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : "JPG, PNG or GIF files up to 10MB each"}
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Selected Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded-lg">
                    <p className="text-sm truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={selectedFiles.length === 0 || uploading}
            className={`w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
              (selectedFiles.length === 0 || uploading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Photos'}
          </button>
        </form>
        
        {uploadSuccess && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
            Photos uploaded successfully! They are now available to use in your stories.
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Photo Guidelines</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Photos should be clear and high quality</li>
          <li>Maximum file size: 10MB per photo</li>
          <li>Supported formats: JPG, PNG, GIF</li>
          <li>Photos will be associated with your stories during story creation</li>
          <li>You can organize photos into albums later from the photo management section</li>
        </ul>
      </div>
    </div>
  );
}