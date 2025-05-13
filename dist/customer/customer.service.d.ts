import { DatabaseService } from '../database/database.service';
import { UpdateCustomerDto } from '../models/dto/customer.dto';
import { Customer } from '../models/interfaces/customer.interface';
export declare class CustomerService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getProfile(id: string): Promise<Customer>;
    updateProfile(id: string, updateDto: UpdateCustomerDto): Promise<Customer>;
}
