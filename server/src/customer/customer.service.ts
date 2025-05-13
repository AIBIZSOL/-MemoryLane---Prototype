import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateCustomerDto } from '../models/dto/customer.dto';
import { Customer } from '../models/interfaces/customer.interface';

@Injectable()
export class CustomerService {
  constructor(private databaseService: DatabaseService) {}

  async getProfile(id: string): Promise<Customer> {
    const customer = this.databaseService.findCustomerById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    
    // Don't return the password
    const { password, ...customerWithoutPassword } = customer;
    return customerWithoutPassword as Customer;
  }

  async updateProfile(id: string, updateDto: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = this.databaseService.updateCustomer(id, updateDto);
    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return updatedCustomer;
  }
}