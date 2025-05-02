import { ICommand } from '@nestjs/cqrs';

export class CreateTimetableCommand implements ICommand {
  constructor(public readonly data: { title: string; tags: string[] }) {}
}
