
import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationDto } from './create-job-application.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateJobApplicationDto extends PartialType(CreateJobApplicationDto) {


  @ApiPropertyOptional({ example: 1, description: 'ID of the user' })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the jobListing' })
  @IsOptional()
  @IsNumber()
  jobListingId?: number;

  @ApiPropertyOptional({
    example: { example: 'resume-123456789.pdf', description: 'Uploaded resume file name' },
    type: String,
    format: 'binary',
    required: false,
  })
  resume?: string;

}

