import { ICommand } from "@nestjs/cqrs";

export class DeleteGradeCommand implements ICommand {
  constructor(public readonly id: string) {}
}