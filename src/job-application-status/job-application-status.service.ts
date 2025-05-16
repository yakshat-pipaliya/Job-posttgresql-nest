import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplicationStatus } from './entities/job-application-status.entity';
import { CreateJobApplicationStatusDto } from './dto/create-job-application-status.dto';
import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';

@Injectable()
export class JobApplicationStatusService {
  constructor(
    @InjectRepository(JobApplicationStatus)
    private readonly JobApplicationStatusRepository: Repository<JobApplicationStatus>,
  ) { }

  async create(createJobApplicationStatusDto: CreateJobApplicationStatusDto): Promise<JobApplicationStatus> {
    const JobApplicationStatus = this.JobApplicationStatusRepository.create(createJobApplicationStatusDto);
    return await this.JobApplicationStatusRepository.save(JobApplicationStatus);
  }

  async findAll(): Promise<JobApplicationStatus[]> {
    return await this.JobApplicationStatusRepository.find({
      relations: ['JobApplication'],
    });
  }

  async findOne(id: number): Promise<JobApplicationStatus> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({
      where: { id },
      relations: ['JobApplication'],
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(`JobApplicationStatus with id ${id} not found`);
    }
    return JobApplicationStatus;
  }

  async update(id: number, updateJobApplicationStatusDto: UpdateJobApplicationStatusDto): Promise<JobApplicationStatus> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.preload({
      id,
      ...updateJobApplicationStatusDto,
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(`JobListing with id ${id} not found`);
    }
    return this.JobApplicationStatusRepository.save(JobApplicationStatus);
  }

   async remove(id: number): Promise<JobApplicationStatus> {
      const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({ where: { id } });
      if (!JobApplicationStatus) {
        throw new NotFoundException(`jobListing id ${id} not found`);
      }
      await this.JobApplicationStatusRepository.remove(JobApplicationStatus);
      return JobApplicationStatus;
    }
}
