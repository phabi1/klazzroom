import { Test, TestingModule } from '@nestjs/testing';
import { SpaceResolver } from './space.resolver';
import { SpaceService } from '../services/space.service';

describe('SpaceResolver', () => {
  let resolver: SpaceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceResolver, SpaceService],
    }).compile();

    resolver = module.get<SpaceResolver>(SpaceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
