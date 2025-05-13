import { ConfigService } from '@nestjs/config';
export declare class AiService {
    private configService;
    constructor(configService: ConfigService);
    generateStory(data: {
        memories: string;
        schoolInfo: any;
        customerName: string;
        era?: string;
    }): Promise<string>;
    generateStoryboardFrames(data: {
        story: string;
        style?: string;
        era?: string;
    }): Promise<any[]>;
}
