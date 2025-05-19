import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { createCompanyDtoExamples, createCompanyDtoDescriptions } from '../../common/message';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ example: createCompanyDtoExamples.CompanyName, description: createCompanyDtoDescriptions.CompanyName })
  @IsOptional()
  @IsString()
  CompanyName?: string;

  @ApiPropertyOptional({ example: createCompanyDtoExamples.Email, description: createCompanyDtoDescriptions.Email })
  @IsOptional()
  @IsEmail()
  Email?: string;

  @ApiPropertyOptional({ example: createCompanyDtoExamples.ContactNo, description: createCompanyDtoDescriptions.ContactNo })
  @IsOptional()
  @IsString()
  ContactNo?: string;

  @ApiPropertyOptional({ example: createCompanyDtoExamples.Location, description: createCompanyDtoDescriptions.Location })
  @IsOptional()
  @IsString()
  Location?: string;
}
