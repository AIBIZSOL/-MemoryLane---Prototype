import { MediaService } from './media.service';
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(customerId: string, type: 'photo' | 'schoolFootage', files: Express.Multer.File[]): Promise<import("../models/interfaces/media.interface").Media[]>;
    getMedia(customerId: string, type?: string): Promise<import("../models/interfaces/media.interface").Media[]>;
}
