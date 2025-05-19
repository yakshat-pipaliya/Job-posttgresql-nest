import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { JobStatus, jobApplicationStatusExamples, jobApplicationStatusMessages, jobApplicationStatusDescriptions } from '../../common/message';

export class CreateJobApplicationStatusDto {
    @ApiProperty({ example: jobApplicationStatusExamples.JobApplicationId, description: jobApplicationStatusDescriptions.JobApplicationId })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    JobApplicationId: number;

    @ApiProperty({
        example: jobApplicationStatusExamples.Status,
        enum: JobStatus,
        description: jobApplicationStatusDescriptions.Status,
    })
    @IsNotEmpty({ message: jobApplicationStatusMessages.statusRequired })
    @IsEnum(JobStatus, {
        message: jobApplicationStatusMessages.invalidStatus,
    })
    Status: JobStatus;
}
