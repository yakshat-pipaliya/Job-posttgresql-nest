import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { JobListingService } from './job-listing.service';
import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';
import { JobListing } from './entities/job-listing.entity';

@Controller('job-listing')
export class JobListingController {
  constructor(private readonly jobListingService: JobListingService) { }

  @Post()
  create(@Body() createJobListingDto: CreateJobListingDto): Promise<JobListing> {
    return this.jobListingService.create(createJobListingDto);
  }

  @Get()
  findAll(): Promise<JobListing[]> {
    return this.jobListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<JobListing> {
    return this.jobListingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobListingDto: UpdateJobListingDto,
  ): Promise<JobListing> {
    return this.jobListingService.update(id, updateJobListingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<JobListing> {
    return this.jobListingService.remove(id);
  }

}
