import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum JobType {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
  Contract = 'Contract',
}

export class CreateJobListingDto {
  @ApiProperty({ example: 1, description: 'ID of the company posting the job' })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiProperty({ example: 'Software Engineer', description: 'Title of the job' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Develop and maintain software...', description: 'Job description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '3+ years experience in Node.js', description: 'Job requirements' })
  @IsNotEmpty()
  @IsString()
  requirements: string;

  @ApiProperty({ example: '₹8,00,000 - ₹12,00,000', description: 'Salary range for the job' })
  @IsNotEmpty()
  @IsString()
  salaryRange: string;

  @ApiProperty({
    example: 'FullTime',
    enum: JobType,
    description: 'Type of job (e.g., FullTime, PartTime, Contract)',
  })
  @IsNotEmpty()
  @IsEnum(JobType, {
    message: `jobType must be one of the following values: ${Object.values(JobType).join(', ')}`,
  })
  jobType: JobType;
}
