import { Injectable, NotFoundException, BadRequestException, Logger, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplicationStatus } from './entities/job-application-status.entity';
import { CreateJobApplicationStatusDto } from './dto/create-job-application-status.dto';
import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';
import { JobApplication } from '../job-application/entities/job-application.entity';
import { messages, jobApplicationStatusMessages, jobApplicationStatusLogMessages } from '../common/message';

@Injectable()
export class JobApplicationStatusService {

  private readonly logger = new Logger(JobApplicationStatusService.name);

  constructor(
    @InjectRepository(JobApplicationStatus)
    private readonly JobApplicationStatusRepository: Repository<JobApplicationStatus>,
  ) { }

  async create(createJobApplicationStatusDto: CreateJobApplicationStatusDto): Promise<{ message: string; jobApplicationStatus?: JobApplicationStatus; error?: string; }> {
    const { JobApplicationId } = createJobApplicationStatusDto;
    try {
      const existing = await this.JobApplicationStatusRepository.findOne({ where: { JobApplicationId }, });
      if (existing) {
        return {
          message: `JobApplicationId ${JobApplicationId} has already applied for JobApplicationStatus.`,
          error: 'DuplicateJobApplicationStatus',
        };
      }
      const jobApplicationStatus = this.JobApplicationStatusRepository.create(createJobApplicationStatusDto);
      const savedJobApplicationStatus = await this.JobApplicationStatusRepository.save(jobApplicationStatus);
      return {
        message: jobApplicationStatusMessages.created,
        jobApplicationStatus: savedJobApplicationStatus,
      };
    } catch (error) {
      this.logger.error(jobApplicationStatusLogMessages.creating, error);
      throw new BadRequestException(messages.internalServerError);
    }
  }


  async findAll(): Promise<{ message: string; jobApplicationStatus: JobApplicationStatus[] }> {
    const jobApplicationStatus = await this.JobApplicationStatusRepository.find({ relations: ['JobApplication'] });
    return { message: 'JobApplicationStatus Found', jobApplicationStatus }
  }

  async findOne(id: number): Promise<{ JobApplicationStatus: JobApplicationStatus; message: string }> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({
      where: { id },
      relations: ['JobApplication'],
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationStatusMessages.notFound);
    }
    return { message: jobApplicationStatusMessages.found, JobApplicationStatus };
  }

  async update(id: number, updateJobApplicationStatusDto: UpdateJobApplicationStatusDto): Promise<{ JobApplicationStatus: JobApplicationStatus; message: string }> {
    const JobApplicationStatus = await this.JobApplicationStatusRepository.preload({
      id,
      ...updateJobApplicationStatusDto,
    });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationStatusMessages.notFound);
    }
    try {
      const updatedJobApplicationStatus = await this.JobApplicationStatusRepository.save(JobApplicationStatus);
      return { message: jobApplicationStatusMessages.updated, JobApplicationStatus: updatedJobApplicationStatus };
    } catch (error) {
      throw new BadRequestException(messages.internalServerError);
    }
  }

  async remove(id: number): Promise<{ message: string; JobApplicationStatus: JobApplicationStatus }> {
    this.logger.log(`${jobApplicationStatusLogMessages.removing} ${id}`);
    const JobApplicationStatus = await this.JobApplicationStatusRepository.findOne({ where: { id } });
    if (!JobApplicationStatus) {
      throw new NotFoundException(jobApplicationStatusMessages.notFound);
    }
    await this.JobApplicationStatusRepository.remove(JobApplicationStatus);
    return { message: jobApplicationStatusMessages.deleted, JobApplicationStatus };
  }
}
