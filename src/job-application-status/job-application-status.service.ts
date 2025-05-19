import { Injectable, NotFoundException, BadRequestException, Logger, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplicationStatus } from './entities/job-application-status.entity';
import { CreateJobApplicationStatusDto } from './dto/create-job-application-status.dto';
import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';
import { messages, jobApplicationMessages, jobApplicationStatusLogMessages } from '../common/message';

@Injectable()
export class JobApplicationStatusService {

  private readonly logger = new Logger(JobApplicationStatusService.name);

  constructor(
    @InjectRepository(JobApplicationStatus)
    private readonly JobApplicationStatusRepository: Repository<JobApplicationStatus>,
  ) { }

  async create(createJobApplicationStatusDto: CreateJobApplicationStatusDto): Promise<{ message: string; jobApplicationStatus: JobApplicationStatus }> {
    const JobApplicationStatus = this.JobApplicationStatusRepository.create(createJobApplicationStatusDto);
    try {
      const savedJobApplicationStatus = await this.JobApplicationStatusRepository.save(JobApplicationStatus);
      return { message: jobApplicationMessages.created, jobApplicationStatus: savedJobApplicationStatus };
    } catch (error) {
      this.logger.error(`${jobApplicationStatusLogMessages.creating}`, error);
      throw new BadRequestException(messages.internalServerError);
    }
  }

  async findAll(): Promise<{ message: string; JobApplicationStatus: JobApplicationStatus[] }> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.find({
      relations: ['JobApplication'],
    });
    return { message: jobApplicationMessages.listReturned, JobApplicationStatus };
  }

  async findOne(id: number): Promise<{ JobApplicationStatus: JobApplicationStatus; message: string }> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({
      where: { id },
      relations: ['JobApplication'],
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationMessages.notFound);
    }
    return { message: jobApplicationMessages.found, JobApplicationStatus };
  }

  async update(id: number, updateJobApplicationStatusDto: UpdateJobApplicationStatusDto): Promise<{ JobApplicationStatus: JobApplicationStatus; message: string }> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.preload({
      id,
      ...updateJobApplicationStatusDto,
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationMessages.notFound);
    }
    try {
      const updatedJobApplicationStatus = await this.JobApplicationStatusRepository.save(JobApplicationStatus);
      return { message: jobApplicationMessages.updated, JobApplicationStatus: updatedJobApplicationStatus };
    } catch (error) {
      this.logger.error(`${jobApplicationStatusLogMessages.updating}`, error);
      throw new BadRequestException(messages.internalServerError);
    }
  }

  async remove(id: number): Promise<{ message: string; JobApplicationStatus: JobApplicationStatus }> {
    this.logger.log(`${jobApplicationStatusLogMessages.removing} ${id}`);
    const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({ where: { id } });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationMessages.notFound);
    }
    await this.JobApplicationStatusRepository.remove(JobApplicationStatus);
    return { message: jobApplicationMessages.deleted , JobApplicationStatus };
  }
}
