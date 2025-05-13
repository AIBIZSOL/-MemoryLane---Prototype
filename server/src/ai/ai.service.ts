import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}

  async generateStory(data: {
    memories: string;
    schoolInfo: any;
    customerName: string;
    era?: string;
  }): Promise<string> {
    const { memories, schoolInfo, customerName, era } = data;
    
    try {
      // Using OpenAI's API for story generation
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
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
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('OPENAI_API_KEY')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating story with AI:', error);
      throw new Error('Failed to generate story');
    }
  }

  async generateStoryboardFrames(data: {
    story: string;
    style?: string;
    era?: string;
  }): Promise<any[]> {
    const { story, style, era } = data;
    
    try {
      // Split story into segments for visualization
      const segments = story.split('\n\n').filter(segment => segment.trim() !== '');
      
      // Limit to 3 frames for prototype
      const framesToGenerate = segments.slice(0, 3);
      
      // For prototype, return simulated frames
      // In production, integrate with actual image generation API
      return framesToGenerate.map((segment, index) => ({
        id: `frame-${index + 1}`,
        text: segment,
        imageUrl: `/uploads/simulated-frame-${index + 1}.jpg`, // This would be a real URL in production
        prompt: `Create a nostalgic, photorealistic image depicting a scene from a high school in the ${era || '1960s'}. Scene description: ${segment}`,
      }));
      
      // Example of real integration with DALL-E (commented out for prototype)
      /*
      const storyboardFrames = [];
      
      for (const segment of framesToGenerate) {
        const promptText = `Create a nostalgic, photorealistic image depicting a scene from a high school in the ${era || '1960s'}.
                           
                          Scene description: ${segment}
                          
                          Style: ${style || 'Photorealistic, soft lighting, nostalgic mood, similar to period photographs'}`;
        
        const response = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            model: 'dall-e-3',
            prompt: promptText,
            n: 1,
            size: '1024x1024',
          },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>('OPENAI_API_KEY')}`,
              'Content-Type': 'application/json',
            },
          },
        );
        
        storyboardFrames.push({
          text: segment,
          imageUrl: response.data.data[0].url,
          prompt: promptText,
        });
      }
      
      return storyboardFrames;
      */
    } catch (error) {
      console.error('Error generating storyboard frames with AI:', error);
      throw new Error('Failed to generate storyboard frames');
    }
  }
}