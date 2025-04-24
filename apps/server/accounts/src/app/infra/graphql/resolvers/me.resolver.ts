import {
  CurrentUser,
  type Identity,
} from '@klazzroom/libs-server-graphql-subgraph-auth';
import { Query, Resolver } from '@nestjs/graphql';
import { AccountService } from '../../../domain/account/services/account.service';
import { Me } from '../types/me.type';

@Resolver(() => Me)
export class MeResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Me)
  async me(@CurrentUser() user: Identity): Promise<Me> {
    const account = await this.accountService.findById(user.id);

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }
}
