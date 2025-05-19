import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Company } from '../../company/entities/company.entity';
import { JobType } from '../../common/message'; 

@Entity()
export class JobListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()

  requirements: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  salaryRange: string;

  @Column({ type: 'enum', enum: JobType, default: JobType.FullTime })
  @IsNotEmpty()
  @IsString()
  jobType: JobType;
}
