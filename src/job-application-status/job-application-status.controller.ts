import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { JobApplicationStatusService } from './job-application-status.service';
import { CreateJobApplicationStatusDto } from './dto/create-job-application-status.dto';
import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';
import { JobApplicationStatus } from './entities/job-application-status.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('job-application-status')
@ApiBearerAuth('access-token')
@Controller('job-application-status')
export class JobApplicationStatusController {
  constructor(
    private readonly jobApplicationStatusService: JobApplicationStatusService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createJobApplicationStatusDto: CreateJobApplicationStatusDto,) {
    return this.jobApplicationStatusService.create(
      createJobApplicationStatusDto,
    );
  }

  @Get()
  findAll() {
    return this.jobApplicationStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobApplicationStatusService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobApplicationStatusDto: UpdateJobApplicationStatusDto, @Req() req,
  ) {
    return this.jobApplicationStatusService.update(id, updateJobApplicationStatusDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.jobApplicationStatusService.remove(id);
  }
}
