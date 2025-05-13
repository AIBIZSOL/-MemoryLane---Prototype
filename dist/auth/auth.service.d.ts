import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { RegisterDto, LoginDto } from '../models/dto/auth.dto';
import { Customer } from '../models/interfaces/customer.interface';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: Omit<Customer, 'password'>;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Omit<Customer, 'password'>;
        token: string;
    }>;
}
