import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AiService } from '../ai/ai.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateStoryDto, UpdateStoryDto } from '../models/dto/story.dto';
import { Story } from '../models/interfaces/story.interface';

@Injectable()
export class StoryService {
  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService,
  ) {}

  async generateStory(customerId: string, createDto: CreateStoryDto): Promise<Story> {
    const { memories, storyPrompt } = createDto;
    
    const customer = this.databaseService.findCustomerById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    
    // Get customer's school info
    const { schoolInfo } = customer;
    
    // Generate story using AI
    let generatedStory: string;
    try {
      generatedStory = await this.aiService.generateStory({
        memories,
        schoolInfo: schoolInfo || {},
        customerName: customer.name,
      });
    } catch (error) {
      // In case of AI service failure, create a placeholder story
      generatedStory = `This is a placeholder story for ${customer.name}'s time at ${schoolInfo?.name || 'school'}. In the full implementation, this would be generated using the OpenAI API based on the provided memories.`;
    }
    
    // Create new story record
    const newStory: Story = {
      id: uuidv4(),
      customerId,
      content: generatedStory,
      prompt: storyPrompt,
      memories,
      status: 'draft',
      createdAt: new Date(),
    };
    
    return this.databaseService.createStory(newStory);
  }

  async getStories(customerId: string): Promise<Story[]> {
    return this.databaseService.findStoriesByCustomerId(customerId);
  }

  async getStory(storyId: string): Promise<Story> {
    const story = this.databaseService.findStoryById(storyId);
    if (!story) {
      throw new NotFoundException('Story not found');
    }
    return story;
  }

  async updateStory(storyId: string, updateDto: UpdateStoryDto): Promise<Story> {
    const updatedStory = this.databaseService.updateStory(storyId, updateDto);
    if (!updatedStory) {
      throw new NotFoundException('Story not found');
    }
    return updatedStory;
  }
}