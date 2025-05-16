import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateJobApplicationDto {
  @ApiProperty({ example: 1, description: 'ID of the user applying for the job' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ example: 2, description: 'ID of the job listing' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  jobListingId: number;

  @ApiProperty({
    example: { example: 'resume-123456789.pdf', description: 'Uploaded resume file name' },
    type: String,
    format: 'binary',
  })
  resume: string;
}