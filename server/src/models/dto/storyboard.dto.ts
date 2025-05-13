import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum StoryboardStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateStoryboardDto {
  @IsEnum(StoryboardStatus)
  status: StoryboardStatus;

  @IsOptional()
  @IsString()
  feedback?: string;
}
