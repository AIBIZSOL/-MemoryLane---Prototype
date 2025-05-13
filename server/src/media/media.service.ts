import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { Media } from '../models/interfaces/media.interface';

@Injectable()
export class MediaService {
  constructor(private databaseService: DatabaseService) {}

  async uploadMedia(customerId: string, files: Express.Multer.File[], type: 'photo' | 'schoolFootage'): Promise<Media[]> {
    const mediaRecords = files.map(file => ({
      id: uuidv4(),
      customerId,
      type,
      filename: file.filename,
      path: file.path,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date(),
    }));

    return this.databaseService.createMedia(mediaRecords);
  }

  async getMedia(customerId: string, type?: string): Promise<Media[]> {
    return this.databaseService.findMediaByCustomerId(customerId, type);
  }
}