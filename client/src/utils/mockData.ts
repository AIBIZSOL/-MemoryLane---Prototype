import { User, Story, Storyboard, Media, Activity, ProjectProgress } from '../types';

// Mock User
export const mockUser: User = {
  id: 'user1',
  name: 'Martha Thompson',
  email: 'martha@example.com',
  createdAt: '2023-01-15T10:30:00Z',
};

// Mock Stories
export const mockStories: Story[] = [
  {
    id: 'story1',
    title: 'My High School Graduation',
    content: 'It was a beautiful day in June when we all gathered for our graduation ceremony. The sun was shining, and everyone was excited to start the next chapter of their lives...',
    status: 'in_progress',
    progress: 75,
    userId: 'user1',
    createdAt: '2023-05-10T14:30:00Z',
    updatedAt: '2023-05-12T09:15:00Z',
  },
  {
    id: 'story2',
    title: 'First Day of College',
    content: 'I remember walking into the campus feeling both nervous and excited. The buildings seemed so large and imposing, but also full of promise...',
    status: 'completed',
    progress: 100,
    userId: 'user1',
    createdAt: '2023-04-22T11:20:00Z',
    updatedAt: '2023-04-25T16:45:00Z',
  },
  {
    id: 'story3',
    title: 'School Trip to Washington D.C.',
    content: 'Our senior class trip to D.C. was one of the highlights of my school years. We visited all the monuments and got to see the government in action...',
    status: 'draft',
    progress: 40,
    userId: 'user1',
    createdAt: '2023-06-01T08:50:00Z',
    updatedAt: '2023-06-01T08:50:00Z',
  },
];

// Mock Storyboards
export const mockStoryboards: Storyboard[] = [
  {
    id: 'storyboard1',
    title: 'Graduation Memories',
    description: 'A visual journey through graduation day, from preparation to celebration.',
    status: 'in_progress',
    storyId: 'story1',
    userId: 'user1',
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-05-16T14:30:00Z',
  },
  {
    id: 'storyboard2',
    title: 'College Beginnings',
    description: 'My first week at college, meeting new friends and exploring the campus.',
    status: 'completed',
    storyId: 'story2',
    userId: 'user1',
    createdAt: '2023-04-26T09:15:00Z',
    updatedAt: '2023-04-28T11:45:00Z',
  },
];

// Mock Media
export const mockMedia: Media[] = [
  {
    id: 'media1',
    url: 'https://via.placeholder.com/600x400?text=Graduation+Photo',
    type: 'image',
    fileName: 'graduation_photo.jpg',
    storyId: 'story1',
    userId: 'user1',
    createdAt: '2023-05-11T15:20:00Z',
  },
  {
    id: 'media2',
    url: 'https://via.placeholder.com/600x400?text=Graduation+Group',
    type: 'image',
    fileName: 'graduation_group.jpg',
    storyId: 'story1',
    userId: 'user1',
    createdAt: '2023-05-11T15:25:00Z',
  },
  {
    id: 'media3',
    url: 'https://via.placeholder.com/600x400?text=College+Campus',
    type: 'image',
    fileName: 'college_campus.jpg',
    storyId: 'story2',
    userId: 'user1',
    createdAt: '2023-04-23T10:10:00Z',
  },
  {
    id: 'media4',
    url: 'https://via.placeholder.com/600x400?text=New+Friends',
    type: 'image',
    fileName: 'new_friends.jpg',
    storyId: 'story2',
    userId: 'user1',
    createdAt: '2023-04-24T16:30:00Z',
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'activity1',
    type: 'upload',
    message: 'Photos uploaded successfully',
    userId: 'user1',
    relatedId: 'story1',
    relatedType: 'story',
    createdAt: '2023-05-11T15:30:00Z',
  },
  {
    id: 'activity2',
    type: 'update',
    message: 'Your story draft is ready for review',
    userId: 'user1',
    relatedId: 'story1',
    relatedType: 'story',
    createdAt: '2023-05-12T09:20:00Z',
  },
  {
    id: 'activity3',
    type: 'create',
    message: 'New storyboard created: Graduation Memories',
    userId: 'user1',
    relatedId: 'storyboard1',
    relatedType: 'storyboard',
    createdAt: '2023-05-15T10:05:00Z',
  },
];

// Mock Project Progress
export const mockProjectProgress: ProjectProgress = {
  storyCreation: {
    status: 'in_progress',
    progress: 75,
  },
  storyboardCreation: {
    status: 'waiting',
  },
  videoCreation: {
    status: 'future',
  },
};

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));