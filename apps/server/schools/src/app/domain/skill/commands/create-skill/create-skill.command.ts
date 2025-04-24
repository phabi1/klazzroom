import { ICommand } from '@nestjs/cqrs';

export class CreateSkillCommand implements ICommand {
  constructor(
    public readonly data: {
      title: string;
      parent: string;
      color?: string;
      weight?: number;
    }
  ) {}
}
