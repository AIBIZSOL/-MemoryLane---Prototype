import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsString()
  memories: string;

  @IsOptional()
  @IsString()
  storyPrompt?: string;
}

export class UpdateStoryDto {
  @IsNotEmpty()
  @IsString()
  status: 'draft' | 'review' | 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  feedback?: string;
}
