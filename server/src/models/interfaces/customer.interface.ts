export interface Customer {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional when returning to client
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
