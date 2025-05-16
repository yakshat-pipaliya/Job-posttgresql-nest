import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JobApplication } from '../../job-application/entities/job-application.entity';

@Entity()
export class JobApplicationStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID of the JobApplication applying for the job' })
    JobApplicationId: number;

    @ManyToOne(() => JobApplication)
    @JoinColumn({ name: 'JobApplicationId' })
    JobApplication: JobApplication;

    @Column({ type: 'enum', enum: ['interviewing', 'rejected', 'pending'], default: 'pending' })
    Status: 'interviewing' | 'rejected' | 'pending';

    @CreateDateColumn()
    appliedAt: Date;
}
