import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../company/entities/company.entity';
import { JobType } from '../dto/create-job-listing.dto'; 

@Entity()
export class JobListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the company posting the job' })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Software Engineer', description: 'Title of the job' })
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Develop and maintain software...', description: 'Job description' })
  description: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '3+ years experience in Node.js', description: 'Job requirements' })
  requirements: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '₹8,00,000 - ₹12,00,000', description: 'Salary range for the job' })
  salaryRange: string;

  @Column({ type: 'enum', enum: JobType, default: JobType.FullTime })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'FullTime', enum: JobType, description: 'Type of job' })
  jobType: JobType;
}
