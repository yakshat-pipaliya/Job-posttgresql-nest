import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { User } from '../user/entities/user.entity';
import { JobListing } from '../job-listing/entities/job-listing.entity';
import { messages } from '../common/message';

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

  async create(createDto: CreateJobApplicationDto): Promise<{ message: string; data?: JobApplication; error?: string }> {
    const { userId, jobListingId } = createDto;
    try {
      const existing = await this.jobApplicationRepository.findOne({ where: { userId, jobListingId } });
      if (existing) {
        return {
          message: `User with ID ${userId} has already applied for job listing ID ${jobListingId}.`,
          error: 'DuplicateJobApplication',
        };
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) return { message: messages.jobApplicationUserNotFound.replace('{userId}', String(userId)), error: messages.jobApplicationUserNotFoundError };

      const jobListing = await this.jobListingRepository.findOne({ where: { id: jobListingId } });
      if (!jobListing) return { message: messages.jobApplicationJobListingNotFound.replace('{jobListingId}', String(jobListingId)), error: messages.jobApplicationJobListingNotFoundError };

      const jobApplication = this.jobApplicationRepository.create(createDto);
      const saved = await this.jobApplicationRepository.save(jobApplication);
      return { message: messages.jobApplicationCreated, data: saved };
    } catch (error) {
      return { message: messages.jobApplicationCreateFailed, error: error.message };
    }
  }

  async findAll(): Promise<{ message: string; jobApplication: JobApplication[] }> {
    const jobApplication = await this.jobApplicationRepository.find({ relations: ['user', 'jobListing'] });
    return { message: 'JobApplications Found', jobApplication }
  }

  async findOne(id: number): Promise<{ message: string; data?: JobApplication; error?: string }> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['user', 'jobListing'],
    });
    if (!jobApplication) {
      return { message: messages.jobApplicationNotFoundWithId.replace('{id}', String(id)), error: messages.jobApplicationNotFoundError };
    }
    return { message: messages.jobApplicationFound, data: jobApplication };
  }

  async update(id: number, updateDto: UpdateJobApplicationDto): Promise<{ message: string; data?: JobApplication; error?: string }> {
    try {
      const existing = await this.jobApplicationRepository.findOne({ where: { id } });
      if (!existing) {
        return { message: messages.jobApplicationNotFoundWithId.replace('{id}', String(id)), error: messages.jobApplicationNotFoundError };
      }
      const userIdToCheck = updateDto.userId !== undefined ? updateDto.userId : existing.userId;
      const jobListingIdToCheck = updateDto.jobListingId !== undefined ? updateDto.jobListingId : existing.jobListingId;
      const duplicate = await this.jobApplicationRepository.findOne({
        where: { userId: userIdToCheck, jobListingId: jobListingIdToCheck },
      });
      if (duplicate && duplicate.id !== id) {
        return {
          message: `User with ID ${userIdToCheck} has already applied for job listing ID ${jobListingIdToCheck}.`,
          error: 'DuplicateJobApplication',
        };
      }
      const updatePayload: Partial<JobApplication> = { id };
      if (updateDto.userId !== undefined && updateDto.userId !== 0) {
        const user = await this.userRepository.findOne({ where: { id: updateDto.userId } });
        if (!user) {
          return { message: messages.jobApplicationUserNotFound.replace('{userId}', String(updateDto.userId)), error: messages.jobApplicationUserNotFoundError };
        }
        updatePayload.user = user;
      }
      if (updateDto.jobListingId !== undefined && updateDto.jobListingId !== 0) {
        const jobListing = await this.jobListingRepository.findOne({ where: { id: updateDto.jobListingId } });
        if (!jobListing) {
          return { message: messages.jobApplicationJobListingNotFound.replace('{jobListingId}', String(updateDto.jobListingId)), error: messages.jobApplicationJobListingNotFoundError };
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
      const saved = await this.jobApplicationRepository.save(updated);
      return { message: messages.jobApplicationUpdated, data: saved };
    } catch (error) {
      return { message: messages.jobApplicationUpdateFailed, error: error.message };
    }
  }

  async remove(id: number): Promise<{ message: string; data?: JobApplication; error?: string }> {
    try {
      const jobApplication = await this.jobApplicationRepository.findOne({ where: { id } });
      if (!jobApplication) {
        return { message: messages.jobApplicationNotFoundWithId.replace('{id}', String(id)), error: messages.jobApplicationNotFoundError };
      }
      await this.jobApplicationRepository.remove(jobApplication);
      return { message: messages.jobApplicationDeleted, data: jobApplication };
    } catch (error) {
      return { message: messages.jobApplicationDeleteFailed, error: error.message };
    }
  }
}
