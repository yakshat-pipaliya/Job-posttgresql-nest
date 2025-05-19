import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationStatusDto } from './create-job-application-status.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { JobStatus, jobApplicationStatusExamples, jobApplicationStatusMessages, jobApplicationStatusDescriptions } from '../../common/message';

export class UpdateJobApplicationStatusDto extends PartialType(CreateJobApplicationStatusDto) {
    @ApiPropertyOptional({ example: jobApplicationStatusExamples.JobApplicationId, description: jobApplicationStatusDescriptions.JobApplicationId })
    @IsOptional()
    @IsNumber()
    JobApplicationId?: number;

    @ApiPropertyOptional({
        example: jobApplicationStatusExamples.Status,
        enum: JobStatus,
        description: jobApplicationStatusDescriptions.Status,
    })
    @IsOptional()
    @IsEnum(JobStatus, {
        message: jobApplicationStatusMessages.invalidStatus,
    })
    Status?: JobStatus;
}
