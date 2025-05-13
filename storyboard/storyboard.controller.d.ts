import { StoryboardService } from './storyboard.service';
import { UpdateStoryboardDto } from '../models/dto/storyboard.dto';
export declare class StoryboardController {
    private storyboardService;
    constructor(storyboardService: StoryboardService);
    generateStoryboard(storyId: string): Promise<import("../models/interfaces/storyboard.interface").Storyboard>;
    getStoryboards(storyId: string): Promise<import("../models/interfaces/storyboard.interface").Storyboard[]>;
    getStoryboard(storyboardId: string): Promise<import("../models/interfaces/storyboard.interface").Storyboard>;
    updateStoryboard(storyboardId: string, updateDto: UpdateStoryboardDto): Promise<import("../models/interfaces/storyboard.interface").Storyboard>;
}
