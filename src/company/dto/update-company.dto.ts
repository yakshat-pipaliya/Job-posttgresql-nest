import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ example: 'Acme Corp', description: 'Name of the company' })
  @IsOptional()
  @IsString()
  CompanyName?: string;

  @ApiPropertyOptional({ example: 'contact@acme.com', description: 'Contact email of the company' })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Contact phone number' })
  @IsOptional()
  @IsString()
  ContactNo?: string;

  @ApiPropertyOptional({ example: 'New York', description: 'Location of the company' })
  @IsOptional()
  @IsString()
  Location?: string;
}
