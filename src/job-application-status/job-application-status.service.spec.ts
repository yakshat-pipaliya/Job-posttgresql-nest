import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicationStatusService } from './job-application-status.service';

describe('JobApplicationStatusService', () => {
  let service: JobApplicationStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobApplicationStatusService],
    }).compile();

    service = module.get<JobApplicationStatusService>(JobApplicationStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
