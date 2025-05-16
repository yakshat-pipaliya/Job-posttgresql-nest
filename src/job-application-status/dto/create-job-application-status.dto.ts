import { IsNotEmpty, IsNumber, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CreateJobApplicationStatusDto {

    @ApiProperty({ example: '1', description: 'Id of the JobApplication ' })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    JobApplicationId: number;

    @ApiProperty({ example: 'pending', description: 'Status of the pending', enum: ['interviewing', 'rejected', 'pending'], default: 'pending' })
    Status: 'interviewing' | 'rejected' | 'pending';
}
