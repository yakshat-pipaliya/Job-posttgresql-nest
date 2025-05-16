import { PartialType } from '@nestjs/mapped-types';
import { CreateJobListingDto, JobType } from './create-job-listing.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class UpdateJobListingDto extends PartialType(CreateJobListingDto) {
  @ApiPropertyOptional({ example: 1, description: 'ID of the company posting the job' })
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({ example: 'Software Engineer', description: 'Title of the job' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Develop and maintain software...', description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '3+ years experience in Node.js', description: 'Job requirements' })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ example: '₹8,00,000 - ₹12,00,000', description: 'Salary range for the job' })
  @IsOptional()
  @IsString()
  salaryRange?: string;

  @ApiPropertyOptional({
    example: 'FullTime',
    enum: JobType,
    description: 'Type of job (e.g., FullTime, PartTime, Contract)',
  })
  @IsOptional()
  @IsEnum(JobType, {
    message: `jobType must be one of the following values: ${Object.values(JobType).join(', ')}`,
  })
  jobType?: JobType;
}
