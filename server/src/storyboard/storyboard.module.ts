import { Module } from '@nestjs/common';
import { StoryboardController } from './storyboard.controller';
import { StoryboardService } from './storyboard.service';
import { DatabaseService } from '../database/';
import { AiModule } from '../ai/ai.module';
import { AiService } from '../ai/ai.service';

@Module({
  imports: [AiModule],
  controllers: [StoryboardController],
  providers: [StoryboardService, DatabaseService, AiService],
})
export class StoryboardModule {}