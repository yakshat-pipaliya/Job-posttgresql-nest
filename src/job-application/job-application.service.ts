import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { User } from '../user/entities/user.entity';
import { JobListing } from '../job-listing/entities/job-listing.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(JobListing)
    private readonly jobListingRepository: Repository<JobListing>,
  ) { }

  async create(createDto: CreateJobApplicationDto): Promise<JobApplication> {
    const { userId, jobListingId } = createDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const jobListing = await this.jobListingRepository.findOne({ where: { id: jobListingId } });
    if (!jobListing) throw new NotFoundException(`Job listing with ID ${jobListingId} not found`);

    const jobApplication = this.jobApplicationRepository.create(createDto);
    return this.jobApplicationRepository.save(jobApplication);
  }

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      relations: ['user', 'jobListing'],
    });
  }

  async findOne(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['user', 'jobListing'],
    });

    if (!jobApplication) {
      throw new NotFoundException(`Job application with ID ${id} not found`);
    }

    return jobApplication;
  }

  async update(id: number, updateDto: UpdateJobApplicationDto): Promise<JobApplication> {
    const existing = await this.jobApplicationRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Job application with ID ${id} not found`);
    }

    const updatePayload: Partial<JobApplication> = { id };

    if (updateDto.userId !== undefined && updateDto.userId !== 0) {
      const user = await this.userRepository.findOne({ where: { id: updateDto.userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateDto.userId} not found`);
      }
      updatePayload.user = user;
    }


    if (updateDto.jobListingId !== undefined && updateDto.jobListingId !== 0) {
      const jobListing = await this.jobListingRepository.findOne({ where: { id: updateDto.jobListingId } });
      if (!jobListing) {
        throw new NotFoundException(`Job listing with ID ${updateDto.jobListingId} not found`);
      }
      updatePayload.jobListing = jobListing;
    }

    if (updateDto.resume !== undefined) {
      updatePayload.resume = updateDto.resume;
    }

    const updated = this.jobApplicationRepository.create({
      ...existing,
      ...updatePayload,
    });

    return this.jobApplicationRepository.save(updated);
  }


  async remove(id: number): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({ where: { id } });
    if (!jobApplication) {
      throw new NotFoundException(`Job application with ID ${id} not found`);
    }

    await this.jobApplicationRepository.remove(jobApplication);
    return jobApplication;
  }
}
