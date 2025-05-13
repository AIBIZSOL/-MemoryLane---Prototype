import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, DatabaseService],
})
export class CustomerModule {}