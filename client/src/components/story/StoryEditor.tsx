// src/components/story/StoryEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Story } from '../../types';
import { storyService } from '../../services';

interface StoryEditorProps {
  storyId?: string;
  onSave?: (story: Story) => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({ storyId, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (storyId) {
      setLoading(true);
      storyService
        .getStory(storyId)
        .then((story) => {
          setTitle(story.title);
          setContent(story.content);
        })
        .catch((err) => {
          console.error('Failed to fetch story:', err);
          setError('Failed to load story. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [storyId]);

  const handleSave = async (asDraft = true) => {
    if (!title.trim()) {
      setError('Please enter a title for your story.');
      return;
    }

    if (!content.trim()) {
      setError('Please enter some content for your story.');
      return;
    }

    try {
      setSaving(true);
      const storyData = {
        title,
        content,
        status: asDraft ? 'draft' : 'completed',
        progress: asDraft ? 75 : 100,
      };

      let savedStory;

      if (storyId) {
        savedStory = await storyService.updateStory(storyId, storyData);
      } else {
        savedStory = await storyService.createStory(storyData);
      }

      if (onSave) {
        onSave(savedStory);
      }
    } catch (err) {
      console.error('Failed to save story:', err);
      setError('Failed to save story. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="bg-gray-200 h-8 w-40 rounded mb-4"></div>
        <div className="bg-gray-200 h-64 rounded mb-4"></div>
        <div className="flex justify-end space-x-2">
          <div className="bg-gray-200 h-10 w-24 rounded"></div>
          <div className="bg-gray-200 h-10 w-24 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">{storyId ? 'Edit Your Story' : 'Create Your Story'}</h2>

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
          placeholder="Enter your story title"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={10}
          placeholder="Write your story here..."
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => handleSave(true)}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save as Draft'}
        </Button>
        <Button
          onClick={() => handleSave(false)}
          disabled={saving}
        >
          {saving ? 'Submitting...' : 'Submit Story'}
        </Button>
      </div>
    </Card>
  );
};

// src/components/story/StoryList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Story } from '../../types';
import { storyService } from '../../services/story.service';

export const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storyService.getStories();
        setStories(data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
        setError('Failed to load stories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="warning">Draft</Badge>;
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
        <h2 className="text-xl font-semibold">Your Stories</h2>
        <Link href="/story/new">
          <Button>Create New Story</Button>
        </Link>
      </div>

      {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

      {stories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't created any stories yet.</p>
          <Link href="/story/new">
            <Button>Get Started</Button>
          </Link>
        </div>
      ) : (
        <div>
          {stories.map((story) => (
            <div
              key={story.id}
              className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{story.title}</h3>
                {getStatusBadge(story.status)}
              </div>
              <p className="text-gray-600 mb-3 line-clamp-2">{story.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(story.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/story/${story.id}`}>
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