import { Controller, Get, Put, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from '../models/dto/customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.customerService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body(ValidationPipe) updateDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateProfile(id, updateDto);
  }
}