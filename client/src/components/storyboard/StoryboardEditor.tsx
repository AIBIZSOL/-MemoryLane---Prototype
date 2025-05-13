// src/components/storyboard/StoryboardEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Story, Storyboard, Media } from '../../types';
import { storyService, storyboardService, mediaService } from '../../services';

interface StoryboardEditorProps {
  storyboardId?: string;
  onSave?: (storyboard: Storyboard) => void;
}

export const StoryboardEditor: React.FC<StoryboardEditorProps> = ({ storyboardId, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStoryId, setSelectedStoryId] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Fetch available stories
        const storiesData = await storyService.getStories();
        setStories(storiesData.filter(story => story.status === 'completed'));

        // If editing existing storyboard
        if (storyboardId) {
          const storyboard = await storyboardService.getStoryboard(storyboardId);
          setTitle(storyboard.title);
          setDescription(storyboard.description);
          setSelectedStoryId(storyboard.storyId);

          // Fetch media for this storyboard
          const mediaData = await mediaService.getMediaByStory(storyboard.storyId);
          setMedia(mediaData);
        }
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [storyboardId]);

  const handleStoryChange = async (storyId: string) => {
    setSelectedStoryId(storyId);
    if (storyId) {
      try {
        const mediaData = await mediaService.getMediaByStory(storyId);
        setMedia(mediaData);
      } catch (err) {
        console.error('Failed to fetch media for story:', err);
        setError('Failed to load media for selected story.');
      }
    } else {
      setMedia([]);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Please enter a title for your storyboard.');
      return;
    }

    if (!selectedStoryId) {
      setError('Please select a story for your storyboard.');
      return;
    }

    try {
      setSaving(true);
      const storyboardData = {
        title,
        description,
        storyId: selectedStoryId,
        status: 'in_progress' as const,
      };

      let savedStoryboard;

      if (storyboardId) {
        savedStoryboard = await storyboardService.updateStoryboard(storyboardId, storyboardData);
      } else {
        savedStoryboard = await storyboardService.createStoryboard(storyboardData);
      }

      if (onSave) {
        onSave(savedStoryboard);
      }
    } catch (err) {
      console.error('Failed to save storyboard:', err);
      setError('Failed to save storyboard. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="bg-gray-200 h-8 w-40 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="bg-gray-200 h-10 rounded"></div>
          <div className="bg-gray-200 h-24 rounded"></div>
          <div className="bg-gray-200 h-10 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        {storyboardId ? 'Edit Storyboard' : 'Create Storyboard'}
      </h2>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your storyboard title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Describe your storyboard"
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
          Select Story
        </label>
        <select
          id="story"
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

      {selectedStoryId && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Photos for Selected Story</h3>
          {media.length === 0 ? (
            <p className="text-gray-500">No photos found for this story. Please upload some photos first.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item.id} className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                  <img src={item.url} alt={item.fileName} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => handleSave()} disabled={saving || stories.length === 0}>
          {saving ? 'Saving...' : 'Save Storyboard'}
        </Button>
      </div>
    </Card>
  );
};

// src/components/storyboard/StoryboardList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Storyboard } from '../../types';
import { storyboardService } from '../../services';

export const StoryboardList: React.FC = () => {
  const [storyboards, setStoryboards] = useState<Storyboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStoryboards = async () => {
      try {
        const data = await storyboardService.getStoryboards();
        setStoryboards(data);
      } catch (err) {
        console.error('Failed to fetch storyboards:', err);
        setError('Failed to load storyboards. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryboards();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="warning">Waiting</Badge>;
      case 'in_progress':
        return <Badge variant="info">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-200 h-8 w-40 rounded"></div>
          <div className="bg-gray-200 h-10 w-24 rounded"></div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
              <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
            </div>
            <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Storyboards</h2>
        <Link href="/storyboard/new">
          <Button>Create New Storyboard</Button>
        </Link>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

      {storyboards.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't created any storyboards yet.</p>
          <Link href="/storyboard/new">
            <Button>Get Started</Button>
          </Link>
        </div>
      ) : (
        <div>
          {storyboards.map((storyboard) => (
            <div
              key={storyboard.id}
              className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{storyboard.title}</h3>
                {getStatusBadge(storyboard.status)}
              </div>
              <p className="text-gray-600 mb-3 line-clamp-2">{storyboard.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(storyboard.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/storyboard/${storyboard.id}`}>
                  <Button variant="text" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};