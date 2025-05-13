export interface Media {
    id: string;
    customerId: string;
    type: 'photo' | 'schoolFootage';
    filename: string;
    path: string;
    originalName: string;
    size: number;
    mimetype: string;
    uploadedAt: Date;
}
