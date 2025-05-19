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
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false })
    @IsNotEmpty()
    jobListingId: number;

    @ManyToOne(() => JobListing)
    @JoinColumn({ name: 'jobListingId' })
    jobListing: JobListing;

    @Column({ nullable: false })
    @IsNotEmpty()
    resume: string;

    @CreateDateColumn()
    appliedAt: Date;

}
