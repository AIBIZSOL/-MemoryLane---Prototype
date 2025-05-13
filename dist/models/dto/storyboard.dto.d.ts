export declare enum StoryboardStatus {
    DRAFT = "draft",
    REVIEW = "review",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class UpdateStoryboardDto {
    status: StoryboardStatus;
    feedback?: string;
}
