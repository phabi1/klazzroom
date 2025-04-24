import { ICommand } from '@nestjs/cqrs';

export class DeleteSkillCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly parent?: string,
  ) {}
}
