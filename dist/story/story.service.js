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
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const ai_service_1 = require("../ai/ai.service");
const uuid_1 = require("uuid");
let StoryService = class StoryService {
    databaseService;
    aiService;
    constructor(databaseService, aiService) {
        this.databaseService = databaseService;
        this.aiService = aiService;
    }
    async generateStory(customerId, createDto) {
        const { memories, storyPrompt } = createDto;
        const customer = this.databaseService.findCustomerById(customerId);
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const { schoolInfo } = customer;
        let generatedStory;
        try {
            generatedStory = await this.aiService.generateStory({
                memories,
                schoolInfo: schoolInfo || {},
                customerName: customer.name,
            });
        }
        catch (error) {
            generatedStory = `This is a placeholder story for ${customer.name}'s time at ${schoolInfo?.name || 'school'}. In the full implementation, this would be generated using the OpenAI API based on the provided memories.`;
        }
        const newStory = {
            id: (0, uuid_1.v4)(),
            customerId,
            content: generatedStory,
            prompt: storyPrompt,
            memories,
            status: 'draft',
            createdAt: new Date(),
        };
        return this.databaseService.createStory(newStory);
    }
    async getStories(customerId) {
        return this.databaseService.findStoriesByCustomerId(customerId);
    }
    async getStory(storyId) {
        const story = this.databaseService.findStoryById(storyId);
        if (!story) {
            throw new common_1.NotFoundException('Story not found');
        }
        return story;
    }
    async updateStory(storyId, updateDto) {
        const updatedStory = this.databaseService.updateStory(storyId, updateDto);
        if (!updatedStory) {
            throw new common_1.NotFoundException('Story not found');
        }
        return updatedStory;
    }
};
exports.StoryService = StoryService;
exports.StoryService = StoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        ai_service_1.AiService])
], StoryService);
//# sourceMappingURL=story.service.js.map