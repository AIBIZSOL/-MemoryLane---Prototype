import { DatabaseService } from '../database/database.service';
import { AiService } from '../ai/ai.service';
import { Storyboard } from '../models/interfaces/storyboard.interface';
import { UpdateStoryboardDto } from '../models/dto/storyboard.dto';
export declare class StoryboardService {
    private databaseService;
    private aiService;
    constructor(databaseService: DatabaseService, aiService: AiService);
    generateStoryboard(storyId: string): Promise<Storyboard>;
    getStoryboards(storyId: string): Promise<Storyboard[]>;
    getStoryboard(storyboardId: string): Promise<Storyboard>;
    updateStoryboard(storyboardId: string, updateDto: UpdateStoryboardDto): Promise<Storyboard>;
}
