import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AiService } from '../ai/ai.service';
import { v4 as uuidv4 } from 'uuid';
import { Storyboard } from '../models/interfaces/storyboard.interface';
import { UpdateStoryboardDto } from '../models/dto/storyboard.dto';

@Injectable()
export class StoryboardService {  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService,
  ) {}

  async generateStoryboard(storyId: string): Promise<Storyboard> {
    const story = this.databaseService.findStoryById(storyId);
    if (!story) {
      throw new NotFoundException('Story not found');
    }
    
    // Check if story is approved
    if (story.status !== 'approved') {
      throw new BadRequestException('Story must be approved before generating storyboard');
    }
    
    // Generate storyboard frames using AI
    let storyboardFrames;
    try {
      storyboardFrames = await this.aiService.generateStoryboardFrames({
        story: story.content,
      });
    } catch (error) {
      // In case of AI service failure, create placeholder frames
      storyboardFrames = [
        {
          id: `frame-1`,
          text: story.content.split('\n\n')[0] || 'Scene 1',
          imageUrl: `/uploads/placeholder-frame-1.jpg`,
          prompt: 'Placeholder prompt',
        },
        {
          id: `frame-2`,
          text: story.content.split('\n\n')[1] || 'Scene 2',
          imageUrl: `/uploads/placeholder-frame-2.jpg`,
          prompt: 'Placeholder prompt',
        },
      ];
    }
    
    // Create new storyboard record
    const newStoryboard: Storyboard = {
      id: uuidv4(),
      storyId,
      customerId: story.customerId,
      frames: storyboardFrames,
      status: 'draft',
      createdAt: new Date(),
    };
    
    return this.databaseService.createStoryboard(newStoryboard);
  }

  async getStoryboards(storyId: string): Promise<Storyboard[]> {
    return this.databaseService.findStoryboardsByStoryId(storyId);
  }

  async getStoryboard(storyboardId: string): Promise<Storyboard> {
    const storyboard = this.databaseService.findStoryboardById(storyboardId);
    if (!storyboard) {
      throw new NotFoundException('Storyboard not found');
    }
    return storyboard;
  }

  async updateStoryboard(storyboardId: string, updateDto: UpdateStoryboardDto): Promise<Storyboard> {
    const updatedStoryboard = this.databaseService.updateStoryboard(storyboardId, updateDto);
    if (!updatedStoryboard) {
      throw new NotFoundException('Storyboard not found');
    }
    return updatedStoryboard;
  }
}