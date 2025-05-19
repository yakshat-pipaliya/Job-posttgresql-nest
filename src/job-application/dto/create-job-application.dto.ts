import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { createJobApplicationDtoExamples, createJobApplicationDtoDescriptions } from '../../common/message';

export class CreateJobApplicationDto {
  @ApiProperty({ example: createJobApplicationDtoExamples.userId, description: createJobApplicationDtoDescriptions.userId })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: createJobApplicationDtoExamples.jobListingId, description: createJobApplicationDtoDescriptions.jobListingId })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  jobListingId: number;

  @ApiProperty({
    example: createJobApplicationDtoExamples.resume,
    description: createJobApplicationDtoDescriptions.resume,
    type: String,
    format: 'binary',
  })
  resume: string;
}