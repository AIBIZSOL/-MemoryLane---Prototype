import { DatabaseService } from '../database/database.service';
import { AiService } from '../ai/ai.service';
import { CreateStoryDto, UpdateStoryDto } from '../models/dto/story.dto';
import { Story } from '../models/interfaces/story.interface';
export declare class StoryService {
    private databaseService;
    private aiService;
    constructor(databaseService: DatabaseService, aiService: AiService);
    generateStory(customerId: string, createDto: CreateStoryDto): Promise<Story>;
    getStories(customerId: string): Promise<Story[]>;
    getStory(storyId: string): Promise<Story>;
    updateStory(storyId: string, updateDto: UpdateStoryDto): Promise<Story>;
}
