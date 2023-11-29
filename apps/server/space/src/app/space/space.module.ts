import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceResolver } from './resolvers/space.resolver';

@Module({
  providers: [SpaceResolver, SpaceService],
})
export class SpaceModule {}
