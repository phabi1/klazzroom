import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Me } from '../types/me.type';

@Resolver(() => Me)
export class MeResolver {
  constructor() {}

  @Query(() => Me)
  me(): Me {
    return {
      id: '',
    };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Me {
    return {
      id: reference.id,
    };
  }
}
