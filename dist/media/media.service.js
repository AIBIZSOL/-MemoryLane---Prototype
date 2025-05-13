"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const uuid_1 = require("uuid");
let MediaService = class MediaService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async uploadMedia(customerId, files, type) {
        const mediaRecords = files.map(file => ({
            id: (0, uuid_1.v4)(),
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
    async getMedia(customerId, type) {
        return this.databaseService.findMediaByCustomerId(customerId, type);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MediaService);
//# sourceMappingURL=media.service.js.map