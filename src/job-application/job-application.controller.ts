import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UploadedFile, UseInterceptors, BadRequestException, InternalServerErrorException, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { multerConfig } from './multer.config';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiResponse, } from '@nestjs/swagger';

@Controller('job-application')
@ApiTags('JobApplication')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) { }

  @Post()
  @UseInterceptors(FileInterceptor('resume', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateJobApplicationDto })
  @ApiOperation({ summary: 'Create a job application with resume upload' })
  async create(
    @Body() data: CreateJobApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<JobApplication> {
    try {
      if (!file) {
        throw new BadRequestException('Resume file is required.');
      }

      data.resume = `/uploads/resume/${file.filename}`;
      return await this.jobApplicationService.create(data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to upload resume file: ' + error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all job applications' })
  @ApiResponse({ status: 200, description: 'List of job applications', type: [JobApplication] })
  findAll(): Promise<JobApplication[]> {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job application by ID' })
  @ApiResponse({ status: 200, description: 'Job application found', type: JobApplication })
  @ApiResponse({ status: 404, description: 'Job application not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<JobApplication> {
    return this.jobApplicationService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('resume', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateJobApplicationDto })
  @ApiOperation({ summary: 'Update a job application by ID with optional resume upload' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<JobApplication> {
    try {
      if (file) {
        updateJobApplicationDto.resume = `/uploads/resume/${file.filename}`;
      }
      return await this.jobApplicationService.update(id, updateJobApplicationDto);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update job application: ' + error.message);
    }
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job application by ID' })
  @ApiResponse({ status: 200, description: 'Job application deleted', type: JobApplication })
  @ApiResponse({ status: 404, description: 'Job application not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<JobApplication> {
    return this.jobApplicationService.remove(id);
  }
}
