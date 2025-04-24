import { ICommand } from "@nestjs/cqrs";

export class UpdateGradeCommand implements ICommand {

  constructor(
    public readonly id: string,
    public readonly data: { name?: string; title?: string; weight?: number }
  ) {}
}