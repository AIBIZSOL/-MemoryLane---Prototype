"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
let DatabaseService = class DatabaseService {
    customers = [];
    stories = [];
    storyboards = [];
    media = [];
    findCustomerByEmail(email) {
        return this.customers.find(c => c.email === email);
    }
    findCustomerById(id) {
        return this.customers.find(c => c.id === id);
    }
    createCustomer(customer) {
        this.customers.push(customer);
        return customer;
    }
    updateCustomer(id, data) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index === -1)
            return undefined;
        this.customers[index] = { ...this.customers[index], ...data, updatedAt: new Date() };
        const { password, ...customerWithoutPassword } = this.customers[index];
        return customerWithoutPassword;
    }
    findStoriesByCustomerId(customerId) {
        return this.stories.filter(s => s.customerId === customerId);
    }
    findStoryById(id) {
        return this.stories.find(s => s.id === id);
    }
    createStory(story) {
        this.stories.push(story);
        return story;
    }
    updateStory(id, data) {
        const index = this.stories.findIndex(s => s.id === id);
        if (index === -1)
            return undefined;
        this.stories[index] = { ...this.stories[index], ...data, updatedAt: new Date() };
        return this.stories[index];
    }
    findStoryboardsByStoryId(storyId) {
        return this.storyboards.filter(s => s.storyId === storyId);
    }
    findStoryboardById(id) {
        return this.storyboards.find(s => s.id === id);
    }
    createStoryboard(storyboard) {
        this.storyboards.push(storyboard);
        return storyboard;
    }
    updateStoryboard(id, data) {
        const index = this.storyboards.findIndex(s => s.id === id);
        if (index === -1)
            return undefined;
        this.storyboards[index] = { ...this.storyboards[index], ...data, updatedAt: new Date() };
        return this.storyboards[index];
    }
    findMediaByCustomerId(customerId, type) {
        return this.media.filter(m => m.customerId === customerId && (!type || m.type === type));
    }
    createMedia(media) {
        if (Array.isArray(media)) {
            this.media.push(...media);
            return media;
        }
        else {
            this.media.push(media);
            return [media];
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map