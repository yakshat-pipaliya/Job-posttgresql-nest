import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JobApplicationStatusService } from './job-application-status.service';
import { CreateJobApplicationStatusDto } from './dto/create-job-application-status.dto';
import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';
import { JobApplicationStatus } from './entities/job-application-status.entity';

@Controller('job-application-status')
export class JobApplicationStatusController {
  constructor(
    private readonly jobApplicationStatusService: JobApplicationStatusService,
  ) { }

  @Post()
  create(
    @Body() createJobApplicationStatusDto: CreateJobApplicationStatusDto,
  ): Promise<JobApplicationStatus> {
    return this.jobApplicationStatusService.create(
      createJobApplicationStatusDto,
    );
  }

  @Get()
  findAll(): Promise<JobApplicationStatus[]> {
    return this.jobApplicationStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<JobApplicationStatus> {
    return this.jobApplicationStatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobApplicationStatusDto: UpdateJobApplicationStatusDto,
  ): Promise<JobApplicationStatus> {
    return this.jobApplicationStatusService.update(id, updateJobApplicationStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<JobApplicationStatus> {
    return this.jobApplicationStatusService.remove(id);
  }
}
