import { Injectable } from '@nestjs/common';
import { Customer } from '../models/interfaces/customer.interface';
import { Story } from '../models/interfaces/story.interface';
import { Storyboard } from '../models/interfaces/storyboard.interface';
import { Media } from '../models/interfaces/media.interface';

@Injectable()
export class DatabaseService {
  private customers: Customer[] = [];
  private stories: Story[] = [];
  private storyboards: Storyboard[] = [];
  private media: Media[] = [];

  // Customer methods
  findCustomerByEmail(email: string): Customer | undefined {
    return this.customers.find(c => c.email === email);
  }

  findCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  createCustomer(customer: Customer): Customer {
    this.customers.push(customer);
    return customer;
  }

  updateCustomer(id: string, data: Partial<Customer>): Customer | undefined {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    this.customers[index] = { ...this.customers[index], ...data, updatedAt: new Date() };
    // Remove password when returning
    const { password, ...customerWithoutPassword } = this.customers[index];
    return customerWithoutPassword as Customer;
  }

  // Story methods
  findStoriesByCustomerId(customerId: string): Story[] {
    return this.stories.filter(s => s.customerId === customerId);
  }

  findStoryById(id: string): Story | undefined {
    return this.stories.find(s => s.id === id);
  }

  createStory(story: Story): Story {
    this.stories.push(story);
    return story;
  }

  updateStory(id: string, data: Partial<Story>): Story | undefined {
    const index = this.stories.findIndex(s => s.id === id);
    if (index === -1) return undefined;

    this.stories[index] = { ...this.stories[index], ...data, updatedAt: new Date() };
    return this.stories[index];
  }

  // Storyboard methods
  findStoryboardsByStoryId(storyId: string): Storyboard[] {
    return this.storyboards.filter(s => s.storyId === storyId);
  }

  findStoryboardById(id: string): Storyboard | undefined {
    return this.storyboards.find(s => s.id === id);
  }

  createStoryboard(storyboard: Storyboard): Storyboard {
    this.storyboards.push(storyboard);
    return storyboard;
  }

  updateStoryboard(id: string, data: Partial<Storyboard>): Storyboard | undefined {
    const index = this.storyboards.findIndex(s => s.id === id);
    if (index === -1) return undefined;

    this.storyboards[index] = { ...this.storyboards[index], ...data, updatedAt: new Date() };
    return this.storyboards[index];
  }

  // Media methods
  findMediaByCustomerId(customerId: string, type?: string): Media[] {
    return this.media.filter(m => m.customerId === customerId && (!type || m.type === type));
  }

  createMedia(media: Media | Media[]): Media[] {
    if (Array.isArray(media)) {
      this.media.push(...media);
      return media;
    } else {
      this.media.push(media);
      return [media];
    }
  }
}