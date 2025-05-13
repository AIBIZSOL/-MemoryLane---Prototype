import { StoryService } from './story.service';
import { CreateStoryDto, UpdateStoryDto } from '../models/dto/story.dto';
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    generateStory(customerId: string, createDto: CreateStoryDto): Promise<import("../models/interfaces/story.interface").Story>;
    getStories(customerId: string): Promise<import("../models/interfaces/story.interface").Story[]>;
    getStory(storyId: string): Promise<import("../models/interfaces/story.interface").Story>;
    updateStory(storyId: string, updateDto: UpdateStoryDto): Promise<import("../models/interfaces/story.interface").Story>;
}
