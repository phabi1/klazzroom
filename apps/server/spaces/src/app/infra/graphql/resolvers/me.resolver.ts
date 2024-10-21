import { QueryBus } from '@nestjs/cqrs';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GetSpacesByUserQuery } from '../../../domain/space/queries/get-spaces-by-user.query';
import { Me } from '../types/me.type';
import { Space } from '../types/space.type';

@Resolver(() => Me)
export class MeResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField(() => [Space])
  spaces(@Parent() parent: { id: string }) {
    return this.queryBus.execute(new GetSpacesByUserQuery(parent.id));
  }
}
