import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { JobListingService } from './job-listing.service';
import { CreateJobListingDto } from './dto/create-job-listing.dto';
import { UpdateJobListingDto } from './dto/update-job-listing.dto';
import { JobListing } from './entities/job-listing.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('JobListing')
@ApiBearerAuth('access-token')
@Controller('job-listing')
export class JobListingController {
  constructor(private readonly jobListingService: JobListingService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createJobListingDto: CreateJobListingDto) {
    return this.jobListingService.create(createJobListingDto);
  }

  @Get()
  findAll() {
    return this.jobListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobListingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobListingDto: UpdateJobListingDto, @Req() req) {
    return this.jobListingService.update(id, updateJobListingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.jobListingService.remove(id);
  }

}
