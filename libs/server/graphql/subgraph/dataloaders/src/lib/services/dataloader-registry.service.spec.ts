import { Test, TestingModule } from '@nestjs/testing';
import { DataloaderRegistryService } from './dataloader-registry.service';

describe('DataloaderRegistryService', () => {
  let service: DataloaderRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataloaderRegistryService],
    }).compile();

    service = module.get<DataloaderRegistryService>(DataloaderRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
