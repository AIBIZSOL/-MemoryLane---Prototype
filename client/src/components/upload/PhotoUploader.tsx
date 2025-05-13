// src/components/upload/PhotoUploader.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Story, Media } from '../../types';
import { storyService, mediaService } from '../../services';

export const PhotoUploader: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedStoryId, setSelectedStoryId] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch available stories
    const fetchStories = async () => {
      try {
        const storiesData = await storyService.getStories();
        setStories(storiesData);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setError('Failed to load stories. Please try again.');
      }
    };

    fetchStories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (!selectedStoryId) {
      setError('Please select a story for these photos.');
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please select at least one photo to upload.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const totalFiles = selectedFiles.length;
      let uploadedFiles = 0;

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('storyId', selectedStoryId);

        await mediaService.uploadMedia(formData);
        uploadedFiles++;
        setUploadProgress(Math.round((uploadedFiles / totalFiles) * 100));
      }

      setUploadComplete(true);
      
      // Clean up
      setPreviews([]);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Failed to upload photos:', err);
      setError('Failed to upload photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

      {uploadComplete && (
        <div className="bg-green-50 text-green-500 p-3 rounded mb-4">
          Photos uploaded successfully!
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
          Select Story
        </label>
        <select
          id="story"
          value={selectedStoryId}
          onChange={(e) => setSelectedStoryId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={uploading}
        >
          <option value="">-- Select a story --</option>
          {stories.map((story) => (
            <option key={story.id} value={story.id}>
              {story.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
              uploading
                ? 'bg-gray-100 border-gray-300'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG, or GIF (MAX. 10MB)</p>
            </div>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Selected Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                  <img src={preview} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploading && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Uploading...</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-500 h-2.5 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {uploadProgress}% ({selectedFiles.length} photos)
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0 || !selectedStoryId}
        >
          {uploading ? 'Uploading...' : 'Upload Photos'}
        </Button>
      </div>
    </Card>
  );
};

// src/components/upload/PhotoGallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Story, Media } from '../../types';
import { storyService } from '../../services/story.service';
import { mediaService } from '../../services/media.service';

export const PhotoGallery: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch available stories
    const fetchStories = async () => {
      try {
        const storiesData = await storyService.getStories();
        setStories(storiesData);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setError('Failed to load stories. Please try again.');
      }
    };

    fetchStories();
  }, []);

  const handleStoryChange = async (storyId: string) => {
    setSelectedStoryId(storyId);
    if (storyId) {
      setLoading(true);
      try {
        const mediaData = await mediaService.getMediaByStory(storyId);
        setMedia(mediaData);
      } catch (err) {
        console.error('Failed to fetch media for story:', err);
        setError('Failed to load photos for selected story.');
      } finally {
        setLoading(false);
      }
    } else {
      setMedia([]);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      try {
        await mediaService.deleteMedia(mediaId);
        // Remove from local state
        setMedia(media.filter((item) => item.id !== mediaId));
      } catch (err) {
        console.error('Failed to delete photo:', err);
        setError('Failed to delete photo. Please try again.');
      }
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Your Photos</h2>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

      <div className="mb-6">
        <label htmlFor="gallery-story" className="block text-sm font-medium text-gray-700 mb-1">
          Select Story to View Photos
        </label>
        <select
          id="gallery-story"
          value={selectedStoryId}
          onChange={(e) => handleStoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a story --</option>
          {stories.map((story) => (
            <option key={story.id} value={story.id}>
              {story.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : selectedStoryId && media.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No photos found for this story.</p>
        </div>
      ) : selectedStoryId && media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                <img src={item.url} alt={item.fileName} className="object-cover w-full h-full" />
              </div>
              <button
                type="button"
                onClick={() => handleDeleteMedia(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Select a story to view photos.</p>
        </div>
      )}
    </Card>
  );
};