import { Controller, Get, Post, Put, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto, UpdateStoryDto } from '../models/dto/story.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('customers/:id/stories')
  async generateStory(
    @Param('id') customerId: string,
    @Body(ValidationPipe) createDto: CreateStoryDto,
  ) {
    return this.storyService.generateStory(customerId, createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('customers/:id/stories')
  async getStories(@Param('id') customerId: string) {
    return this.storyService.getStories(customerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stories/:id')
  async getStory(@Param('id') storyId: string) {
    return this.storyService.getStory(storyId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('stories/:id')
  async updateStory(
    @Param('id') storyId: string,
    @Body(ValidationPipe) updateDto: UpdateStoryDto,
  ) {
    return this.storyService.updateStory(storyId, updateDto);
  }
}