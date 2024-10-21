import { CommandBus } from '@nestjs/cqrs';
import { Mutation, Resolver } from '@nestjs/graphql';
import { CreateAdministratorSpaceCommand } from '../../../../domain/space/commands/create-administrator-space-command';
import { AdministratorSpace } from '../../types/administrator-space.type';

@Resolver(() => AdministratorSpace)
export class AdministratorResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => AdministratorSpace, {
    name: 'createAdministratorSpace',
    description: 'Create an adminstrator space',
  })
  create() {
    return this.commandBus.execute(new CreateAdministratorSpaceCommand('1'));
  }
}
