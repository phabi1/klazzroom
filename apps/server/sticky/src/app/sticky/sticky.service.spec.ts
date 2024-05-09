import { Test, TestingModule } from '@nestjs/testing';
import { StickyService } from './sticky.service';

describe('StickyService', () => {
  let service: StickyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickyService],
    }).compile();

    service = module.get<StickyService>(StickyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
