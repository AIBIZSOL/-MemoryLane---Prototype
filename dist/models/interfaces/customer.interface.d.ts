export interface Customer {
    id: string;
    name: string;
    email: string;
    password?: string;
    schoolInfo?: {
        name?: string;
        location?: string;
        yearsAttended?: {
            start?: string;
            end?: string;
        };
        description?: string;
    };
    createdAt: Date;
    updatedAt?: Date;
}
