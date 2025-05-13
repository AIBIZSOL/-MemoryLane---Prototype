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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let AiService = class AiService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async generateStory(data) {
        const { memories, schoolInfo, customerName, era } = data;
        try {
            const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are a creative writer specializing in nostalgic personal narratives. 
                      Create a vivid, emotionally resonant story based on a person's school memories from their teenage years.
                      Focus on sensory details, emotional moments, and period-appropriate references.
                      Write in third person using the person's real name.
                      The narrative should be 3-5 paragraphs long for this prototype.`,
                    },
                    {
                        role: 'user',
                        content: `Create a nostalgic story about ${customerName}'s time at ${schoolInfo.name} during ${era || '1960s'}.
                     
                     Here are the memories to incorporate:
                     ${memories}
                     
                     School details:
                     ${schoolInfo.location || ''}
                     ${schoolInfo.description || ''}`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }, {
                headers: {
                    Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            console.error('Error generating story with AI:', error);
            throw new Error('Failed to generate story');
        }
    }
    async generateStoryboardFrames(data) {
        const { story, style, era } = data;
        try {
            const segments = story.split('\n\n').filter(segment => segment.trim() !== '');
            const framesToGenerate = segments.slice(0, 3);
            return framesToGenerate.map((segment, index) => ({
                id: `frame-${index + 1}`,
                text: segment,
                imageUrl: `/uploads/simulated-frame-${index + 1}.jpg`,
                prompt: `Create a nostalgic, photorealistic image depicting a scene from a high school in the ${era || '1960s'}. Scene description: ${segment}`,
            }));
        }
        catch (error) {
            console.error('Error generating storyboard frames with AI:', error);
            throw new Error('Failed to generate storyboard frames');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AiService);
//# sourceMappingURL=ai.service.js.map