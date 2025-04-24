import { ICommand } from '@nestjs/cqrs';

export class CreateGradeCommand implements ICommand {
  constructor(
    public readonly data: { name: string; title: string; weight?: number }
  ) {}
}
