import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobListingService } from './job-listing.service';
import { JobListingController } from './job-listing.controller';
import { JobListing } from './entities/job-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobListing])],
  controllers: [JobListingController],
  providers: [JobListingService],
})
export class JobListingModule {}
