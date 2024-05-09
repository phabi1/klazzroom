import { Test, TestingModule } from '@nestjs/testing';
import { StickyResolver } from './sticky.resolver';
import { StickyService } from './sticky.service';

describe('StickyResolver', () => {
  let resolver: StickyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickyResolver, StickyService],
    }).compile();

    resolver = module.get<StickyResolver>(StickyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
