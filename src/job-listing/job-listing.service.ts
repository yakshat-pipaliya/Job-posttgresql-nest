import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from './entities/job-listing.entity';
import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';

@Injectable()
export class JobListingService {
  constructor(
    @InjectRepository(JobListing)
    private readonly jobListingRepository: Repository<JobListing>,
  ) { }

  async create(createJobListingDto: CreateJobListingDto): Promise<JobListing> {
    const jobListing = this.jobListingRepository.create(createJobListingDto);
    return await this.jobListingRepository.save(jobListing);
  }

  async findAll(): Promise<JobListing[]> {
    return await this.jobListingRepository.find({
      relations: ['company'],
    });
  }

  async findOne(id: number): Promise<JobListing> {
    const jobListing = await this.jobListingRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!jobListing) {
      throw new NotFoundException(`JobListing with id ${id} not found`);
    }
    return jobListing;
  }

  async update(id: number, updateJobListingDto: UpdateJobListingDto): Promise<JobListing> {
    const jobListing = await this.jobListingRepository.preload({
      id,
      ...updateJobListingDto,
    });
    if (!jobListing) {
      throw new NotFoundException(`JobListing with id ${id} not found`);
    }
    return this.jobListingRepository.save(jobListing);
  }

  async remove(id: number): Promise<JobListing> {
    const jobListing = await this.jobListingRepository.findOne({ where: { id } });
    if (!jobListing) {
      throw new NotFoundException(`jobListing id ${id} not found`);
    }
    await this.jobListingRepository.remove(jobListing);
    return jobListing;
  }
}
