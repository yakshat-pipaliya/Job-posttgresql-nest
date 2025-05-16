import { PartialType } from '@nestjs/mapped-types';
import { CreateJobApplicationStatusDto } from './create-job-application-status.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateJobApplicationStatusDto extends PartialType(CreateJobApplicationStatusDto) {


    @ApiPropertyOptional({ example: 1, description: 'ID of the user' })
    @IsOptional()
    @IsNumber()
    JobApplicationId?: number;


    @ApiPropertyOptional({ example: 'pending', description: 'Status of the pending', enum: ['interviewing', 'rejected', 'pending'], default: 'pending', nullable: true })
    @IsString()
    @IsOptional()
    Status: 'interviewing' | 'rejected' | 'pending';


}

