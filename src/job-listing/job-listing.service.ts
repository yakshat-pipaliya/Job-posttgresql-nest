import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from './entities/job-listing.entity';
import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';
import { messages } from '../common/message';

@Injectable()
export class JobListingService {
  constructor(
    @InjectRepository(JobListing)
    private readonly jobListingRepository: Repository<JobListing>,
  ) { }

  async create(createJobListingDto: CreateJobListingDto): Promise<{ message: string; jobListing: JobListing }> {
    const jobListing = this.jobListingRepository.create(createJobListingDto);
    const savedJobListing = await this.jobListingRepository.save(jobListing);
    return { message: messages.jobListingCreated, jobListing: savedJobListing };
  }

  async findAll(): Promise<{ message: string; jobListings: JobListing[] }> {
    const jobListings = await this.jobListingRepository.find({
      relations: ['company'],
    });
    return { message: messages.jobListingListReturned, jobListings };
  }

  async findOne(id: number): Promise<{ message: string; jobListing: JobListing }> {
    const jobListing = await this.jobListingRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!jobListing) {
      throw new NotFoundException(messages.jobListingNotFoundWithId.replace('{id}', id.toString()));
    }
    return { message: messages.jobListingFound, jobListing };
  }

  async update(id: number, updateJobListingDto: UpdateJobListingDto): Promise<{ message: string; jobListing: JobListing }> {
    const jobListing = await this.jobListingRepository.preload({
      id,
      ...updateJobListingDto,
    });
    if (!jobListing) {
      throw new NotFoundException(messages.jobListingNotFoundWithId.replace('{id}', id.toString()));
    }
    const updatedJobListing = await this.jobListingRepository.save(jobListing);
    return { message: messages.jobListingUpdated, jobListing: updatedJobListing };
  }

  async remove(id: number): Promise<{ message: string; jobListing: JobListing }> {
    const jobListing = await this.jobListingRepository.findOne({ where: { id } });
    if (!jobListing) {
      throw new NotFoundException(messages.jobListingNotFoundWithId.replace('{id}', id.toString()));
    }
    await this.jobListingRepository.remove(jobListing);
    return { message: messages.jobListingDeletedWithId.replace('{id}', id.toString()), jobListing };
  }
}
