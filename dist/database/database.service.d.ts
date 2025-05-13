import { Customer } from '../models/interfaces/customer.interface';
import { Story } from '../models/interfaces/story.interface';
import { Storyboard } from '../models/interfaces/storyboard.interface';
import { Media } from '../models/interfaces/media.interface';
export declare class DatabaseService {
    private customers;
    private stories;
    private storyboards;
    private media;
    findCustomerByEmail(email: string): Customer | undefined;
    findCustomerById(id: string): Customer | undefined;
    createCustomer(customer: Customer): Customer;
    updateCustomer(id: string, data: Partial<Customer>): Customer | undefined;
    findStoriesByCustomerId(customerId: string): Story[];
    findStoryById(id: string): Story | undefined;
    createStory(story: Story): Story;
    updateStory(id: string, data: Partial<Story>): Story | undefined;
    findStoryboardsByStoryId(storyId: string): Storyboard[];
    findStoryboardById(id: string): Storyboard | undefined;
    createStoryboard(storyboard: Storyboard): Storyboard;
    updateStoryboard(id: string, data: Partial<Storyboard>): Storyboard | undefined;
    findMediaByCustomerId(customerId: string, type?: string): Media[];
    createMedia(media: Media | Media[]): Media[];
}
