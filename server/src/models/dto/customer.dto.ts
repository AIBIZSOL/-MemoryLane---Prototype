import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// Define nested classes for proper validation
class YearsAttendedDto {
  @IsOptional()
  @IsString()
  start?: string;

  @IsOptional()
  @IsString()
  end?: string;
}

class SchoolInfoDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => YearsAttendedDto)
  yearsAttended?: YearsAttendedDto;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => SchoolInfoDto)
  schoolInfo?: SchoolInfoDto;
}