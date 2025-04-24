import { ICommand } from '@nestjs/cqrs';

export class UpdateSkillCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly data: Partial<{
      title: string;
      parent: string;
      color?: string;
      weight?: number;
    }>
  ) {}
}
