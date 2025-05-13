export interface StoryBoardFrame {
    id: string;
    text: string;
    imageUrl: string;
    prompt?: string;
    feedback?: string;
}
export interface Storyboard {
    id: string;
    storyId: string;
    customerId: string;
    frames: StoryBoardFrame[];
    status: 'draft' | 'review' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt?: Date;
}
