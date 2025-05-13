import { Controller, Get, Post, Put, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { StoryboardService } from './storyboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateStoryboardDto } from '../models/dto/storyboard.dto';

@Controller('api')
export class StoryboardController {
  constructor(private storyboardService: StoryboardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('stories/:id/storyboards')
  async generateStoryboard(@Param('id') storyId: string) {
    return this.storyboardService.generateStoryboard(storyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stories/:id/storyboards')
  async getStoryboards(@Param('id') storyId: string) {
    return this.storyboardService.getStoryboards(storyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('storyboards/:id')
  async getStoryboard(@Param('id') storyboardId: string) {
    return this.storyboardService.getStoryboard(storyboardId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('storyboards/:id')
  async updateStoryboard(
    @Param('id') storyboardId: string,
    @Body(ValidationPipe) updateDto: UpdateStoryboardDto,
  ) {
    return this.storyboardService.updateStoryboard(storyboardId, updateDto);
  }
}