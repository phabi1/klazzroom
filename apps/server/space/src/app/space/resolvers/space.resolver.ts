import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SpaceService } from '../services/space.service';
import { SpaceResult } from '../types/space-result.type';
import { CurrentUser } from '@klazzroom/server-common-auth';

@Resolver()
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Query(() => [SpaceResult], { name: 'spaces', nullable: 'items' })
  findAll(@CurrentUser() uid: string) {
    return this.spaceService.findByUser(uid);
  }

  @Query(() => SpaceResult, { name: 'space' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.spaceService.findOne(id);
  }

  @Mutation(() => SpaceResult)
  removeSpace(@Args('id', { type: () => String }) id: string) {
    return this.spaceService.remove(id);
  }
}
