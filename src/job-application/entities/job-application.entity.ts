import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { JobListing } from '../../job-listing/entities/job-listing.entity';

@Entity()
export class JobApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID of the user applying for the job' })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false })
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: 'ID of the job listing' })
    jobListingId: number;

    @ManyToOne(() => JobListing)
    @JoinColumn({ name: 'jobListingId' })
    jobListing: JobListing;

    @Column({ nullable: false })
    @IsNotEmpty()
    @ApiProperty({ example: 'resume-123456789.pdf', description: 'Uploaded resume file name' })
    resume: string;

    @CreateDateColumn()
    appliedAt: Date;

}
