import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { multerConfig } from './multer.config';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiResponse, } from '@nestjs/swagger';
import { jobApplicationMessages, jobApplicationSummaries, jobApplicationDescriptions } from '../common/message';

@Controller('job-application')
@ApiTags('JobApplication')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) { }

  @Post()
  @UseInterceptors(FileInterceptor('resume', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateJobApplicationDto })
  @ApiOperation({ summary: jobApplicationSummaries.create })
  async create(
    @Body() data: CreateJobApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: jobApplicationMessages.resumeRequired, error: jobApplicationMessages.resumeMissingError };
    }
    data.resume = `/uploads/resume/${file.filename}`;
    return this.jobApplicationService.create(data);
  }

  @Get()
  @ApiOperation({ summary: jobApplicationSummaries.getAll })
  @ApiResponse({ status: 200, description: jobApplicationDescriptions.list, type: [JobApplication] })
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: jobApplicationSummaries.getOne })
  @ApiResponse({ status: 200, description: jobApplicationDescriptions.found, type: JobApplication })
  @ApiResponse({ status: 404, description: jobApplicationDescriptions.notFound })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('resume', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateJobApplicationDto })
  @ApiOperation({ summary: jobApplicationSummaries.update })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateJobApplicationDto.resume = `/uploads/resume/${file.filename}`;
    }
    return this.jobApplicationService.update(id, updateJobApplicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: jobApplicationSummaries.delete })
  @ApiResponse({ status: 200, description: jobApplicationDescriptions.deleted, type: JobApplication })
  @ApiResponse({ status: 404, description: jobApplicationDescriptions.notFound })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationService.remove(id);
  }
}
