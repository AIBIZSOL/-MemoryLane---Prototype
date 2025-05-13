"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryboardService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const ai_service_1 = require("../ai/ai.service");
const uuid_1 = require("uuid");
let StoryboardService = class StoryboardService {
    databaseService;
    aiService;
    constructor(databaseService, aiService) {
        this.databaseService = databaseService;
        this.aiService = aiService;
    }
    async generateStoryboard(storyId) {
        const story = this.databaseService.findStoryById(storyId);
        if (!story) {
            throw new common_1.NotFoundException('Story not found');
        }
        if (story.status !== 'approved') {
            throw new common_1.BadRequestException('Story must be approved before generating storyboard');
        }
        let storyboardFrames;
        try {
            storyboardFrames = await this.aiService.generateStoryboardFrames({
                story: story.content,
            });
        }
        catch (error) {
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
        const newStoryboard = {
            id: (0, uuid_1.v4)(),
            storyId,
            customerId: story.customerId,
            frames: storyboardFrames,
            status: 'draft',
            createdAt: new Date(),
        };
        return this.databaseService.createStoryboard(newStoryboard);
    }
    async getStoryboards(storyId) {
        return this.databaseService.findStoryboardsByStoryId(storyId);
    }
    async getStoryboard(storyboardId) {
        const storyboard = this.databaseService.findStoryboardById(storyboardId);
        if (!storyboard) {
            throw new common_1.NotFoundException('Storyboard not found');
        }
        return storyboard;
    }
    async updateStoryboard(storyboardId, updateDto) {
        const updatedStoryboard = this.databaseService.updateStoryboard(storyboardId, updateDto);
        if (!updatedStoryboard) {
            throw new common_1.NotFoundException('Storyboard not found');
        }
        return updatedStoryboard;
    }
};
exports.StoryboardService = StoryboardService;
exports.StoryboardService = StoryboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        ai_service_1.AiService])
], StoryboardService);
//# sourceMappingURL=storyboard.service.js.map