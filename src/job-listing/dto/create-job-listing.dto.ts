import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createJobListingDtoExamples, createJobListingDtoDescriptions, jobTypeEnumMessage, JobType } from '../../common/message';

export class CreateJobListingDto {
  @ApiProperty({ example: createJobListingDtoExamples.companyId, description: createJobListingDtoDescriptions.companyId })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiProperty({ example: createJobListingDtoExamples.title, description: createJobListingDtoDescriptions.title })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: createJobListingDtoExamples.description, description: createJobListingDtoDescriptions.description })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: createJobListingDtoExamples.requirements, description: createJobListingDtoDescriptions.requirements })
  @IsNotEmpty()
  @IsString()
  requirements: string;

  @ApiProperty({ example: createJobListingDtoExamples.salaryRange, description: createJobListingDtoDescriptions.salaryRange })
  @IsNotEmpty()
  @IsString()
  salaryRange: string;

  @ApiProperty({
    example: createJobListingDtoExamples.jobType,
    enum: JobType,
    description: createJobListingDtoDescriptions.jobType,
  })
  @IsNotEmpty()
  @IsEnum(JobType, {
    message: jobTypeEnumMessage,
  })
  jobType: JobType;
}
