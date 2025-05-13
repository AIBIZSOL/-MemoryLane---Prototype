import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { DatabaseService } from '../database/';
import { AiModule } from '../ai/ai.module';
import { AiService } from '../ai/ai.service';

@Module({
  imports: [AiModule],
  controllers: [StoryController],
  providers: [StoryService, DatabaseService, AiService],
})
export class StoryModule {}