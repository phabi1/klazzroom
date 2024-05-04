import { Test, TestingModule } from '@nestjs/testing';
import { HolidayResolver } from './holiday.resolver';
import { HolidayService } from '../services/holiday.service';

describe('HolidayResolver', () => {
  let resolver: HolidayResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayResolver, HolidayService],
    }).compile();

    resolver = module.get<HolidayResolver>(HolidayResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
