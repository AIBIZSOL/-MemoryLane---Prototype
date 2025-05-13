import { DatabaseService } from '../database/database.service';
import { Media } from '../models/interfaces/media.interface';
export declare class MediaService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    uploadMedia(customerId: string, files: Express.Multer.File[], type: 'photo' | 'schoolFootage'): Promise<Media[]>;
    getMedia(customerId: string, type?: string): Promise<Media[]>;
}
