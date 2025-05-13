import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from '../models/dto/customer.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getProfile(id: string): Promise<import("../models/interfaces/customer.interface").Customer>;
    updateProfile(id: string, updateDto: UpdateCustomerDto): Promise<import("../models/interfaces/customer.interface").Customer>;
}
