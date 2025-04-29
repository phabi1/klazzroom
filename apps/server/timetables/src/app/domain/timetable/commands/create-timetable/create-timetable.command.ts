import { ICommand } from '@nestjs/cqrs';

export class CreateTimetableCommand implements ICommand {
  constructor(public readonly title: string, public readonly tags: string[]) {}
}
