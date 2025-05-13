import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../models/dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: Omit<import("../models/interfaces/customer.interface").Customer, "password">;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Omit<import("../models/interfaces/customer.interface").Customer, "password">;
        token: string;
    }>;
}
