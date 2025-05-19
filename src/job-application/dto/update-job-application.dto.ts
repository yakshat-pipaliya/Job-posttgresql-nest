import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationDto } from './create-job-application.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { createJobApplicationDtoExamples, createJobApplicationDtoDescriptions } from '../../common/message';

export class UpdateJobApplicationDto extends PartialType(CreateJobApplicationDto) {
  @ApiPropertyOptional({ example: createJobApplicationDtoExamples.userId, description: createJobApplicationDtoDescriptions.userId })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({ example: createJobApplicationDtoExamples.jobListingId, description: createJobApplicationDtoDescriptions.jobListingId })
  @IsOptional()
  @IsNumber()
  jobListingId?: number;

  @ApiPropertyOptional({
    example: createJobApplicationDtoExamples.resume,
    description: createJobApplicationDtoDescriptions.resume,
    type: String,
    format: 'binary',
    required: false,
  })
  resume?: string;
}

