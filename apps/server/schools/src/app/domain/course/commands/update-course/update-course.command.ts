import { ICommand } from '@nestjs/cqrs';

export class UpdateCourseCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly data: Readonly<{
      gradeIds?: string[];
      holidayZone?: string;
    }>
  ) {}
}
