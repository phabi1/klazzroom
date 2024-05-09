import { Module } from '@nestjs/common';
import { StickyService } from './sticky.service';
import { StickyResolver } from './sticky.resolver';

@Module({
  providers: [StickyResolver, StickyService],
})
export class StickyModule {}
