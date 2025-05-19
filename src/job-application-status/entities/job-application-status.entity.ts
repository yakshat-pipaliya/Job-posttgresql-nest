import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { JobApplication } from '../../job-application/entities/job-application.entity';
import { JobStatus } from '../../common/message';

@Entity()
export class JobApplicationStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    JobApplicationId: number;

    @ManyToOne(() => JobApplication)
    @JoinColumn({ name: 'JobApplicationId' })
    JobApplication: JobApplication;

    @Column({ type: 'enum', enum: JobStatus, default: JobStatus.Pending })
    @IsNotEmpty()
    Status: JobStatus;

    @CreateDateColumn()
    appliedAt: Date;
}
