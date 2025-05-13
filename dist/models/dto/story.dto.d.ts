export declare class CreateStoryDto {
    memories: string;
    storyPrompt?: string;
}
export declare class UpdateStoryDto {
    status: 'draft' | 'review' | 'approved' | 'rejected';
    feedback?: string;
}
