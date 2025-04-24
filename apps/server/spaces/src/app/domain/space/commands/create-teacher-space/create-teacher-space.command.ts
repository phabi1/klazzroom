import { ICommand } from '@nestjs/cqrs';

export class CreateTeacherSpaceCommand implements ICommand {
  constructor(
    public readonly data: Readonly<{ title: string; userId: string }>
  ) {}
}
