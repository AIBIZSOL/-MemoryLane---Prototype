export interface Story {
  id: string;
  customerId: string;
  title?: string;
  content: string;
  prompt?: string;
  memories?: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  feedback?: string;
  createdAt: Date;
  updatedAt?: Date;
}
