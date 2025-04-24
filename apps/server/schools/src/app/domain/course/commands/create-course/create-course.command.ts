import { ICommand } from '@nestjs/cqrs';

export class CreateCourseCommand implements ICommand {
  constructor(public readonly data: { gradeIds: string[] }) {}
}
