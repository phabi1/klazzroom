import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Space, Spaces } from '../types/space.type';
import { SpaceService } from '../../../domain/space/services/space.service';
import { Me } from '../types/me.type';

@Resolver(() => Me)
export class MeResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @ResolveField(() => [Space])
  async spaces(@Parent() me: { id: string }): Promise<Spaces[]> {
    return this.spaceService.findByUser(me.id);
  }
}
