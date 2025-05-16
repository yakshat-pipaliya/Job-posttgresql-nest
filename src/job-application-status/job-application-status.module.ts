import { Module } from '@nestjs/common';
import { JobApplicationStatusService } from './job-application-status.service';
import { JobApplicationStatusController } from './job-application-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationStatus } from './entities/job-application-status.entity';
import { JobApplication } from '../job-application/entities/job-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplicationStatus, JobApplication])],
  controllers: [JobApplicationStatusController],
  providers: [JobApplicationStatusService],
})
export class JobApplicationStatusModule { }
