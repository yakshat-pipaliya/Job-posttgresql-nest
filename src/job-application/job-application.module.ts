import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { JobApplication } from './entities/job-application.entity';
import { User } from '../user/entities/user.entity';
import { JobListing } from '../job-listing/entities/job-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, User, JobListing])],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
