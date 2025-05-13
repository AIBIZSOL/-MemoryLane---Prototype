import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDto, LoginDto } from '../models/dto/auth.dto';
import { Customer } from '../models/interfaces/customer.interface';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Omit<Customer, 'password'>; token: string }> {
    const { name, email, password } = registerDto;
    
    // Check if user exists
    const existingUser = this.databaseService.findCustomerByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    
    // In a real app, you would hash the password here
    const newUser: Customer = {
      id: uuidv4(),
      name,
      email,
      password,
      createdAt: new Date(),
    };
    
    this.databaseService.createCustomer(newUser);
    
    // Generate JWT token
    const token = this.jwtService.sign({ id: newUser.id, email: newUser.email });
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return { user: userWithoutPassword, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Omit<Customer, 'password'>; token: string }> {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = this.databaseService.findCustomerByEmail(email);
    
    // Check if user exists and password matches
    // In a real app, you would compare hashed passwords
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }
}