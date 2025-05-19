import { PartialType } from '@nestjs/mapped-types';
import { CreateJobListingDto } from './create-job-listing.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { createJobListingDtoExamples, createJobListingDtoDescriptions, JobType, jobTypeEnumMessage } from '../../common/message';

export class UpdateJobListingDto extends PartialType(CreateJobListingDto) {
  @ApiPropertyOptional({ example: createJobListingDtoExamples.companyId, description: createJobListingDtoDescriptions.companyId })
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({ example: createJobListingDtoExamples.title, description: createJobListingDtoDescriptions.title })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: createJobListingDtoExamples.description, description: createJobListingDtoDescriptions.description })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: createJobListingDtoExamples.requirements, description: createJobListingDtoDescriptions.requirements })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ example: createJobListingDtoExamples.salaryRange, description: createJobListingDtoDescriptions.salaryRange })
  @IsOptional()
  @IsString()
  salaryRange?: string;

  @ApiPropertyOptional({
    example: createJobListingDtoExamples.jobType,
    enum: JobType,
    description: createJobListingDtoDescriptions.jobType,
  })
  @IsOptional()
  @IsEnum(JobType, {
    message: jobTypeEnumMessage,
  })
  jobType?: JobType;
}
