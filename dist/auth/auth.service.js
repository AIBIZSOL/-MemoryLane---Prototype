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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const database_service_1 = require("../database/database.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    databaseService;
    jwtService;
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { name, email, password } = registerDto;
        const existingUser = this.databaseService.findCustomerByEmail(email);
        if (existingUser) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const newUser = {
            id: (0, uuid_1.v4)(),
            name,
            email,
            password,
            createdAt: new Date(),
        };
        this.databaseService.createCustomer(newUser);
        const token = this.jwtService.sign({ id: newUser.id, email: newUser.email });
        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, token };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = this.databaseService.findCustomerByEmail(email);
        if (!user || user.password !== password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user.id, email: user.email });
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map