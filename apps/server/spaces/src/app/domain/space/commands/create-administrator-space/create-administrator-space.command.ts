import { ICommand } from '@nestjs/cqrs';

export class CreateAdministratorSpaceCommand implements ICommand {
  constructor(
    public readonly data: Readonly<{
      title: string;
      userId: string;
    }>
  ) {}
}
