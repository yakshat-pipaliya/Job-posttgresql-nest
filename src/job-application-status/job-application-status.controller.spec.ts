import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationStatusController } from './job-application-status.controller';
import { JobApplicationStatusService } from './job-application-status.service';

describe('JobApplicationStatusController', () => {
  let controller: JobApplicationStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicationStatusController],
      providers: [JobApplicationStatusService],
    }).compile();

    controller = module.get<JobApplicationStatusController>(JobApplicationStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
