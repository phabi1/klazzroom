import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddStudentToCourseCommand } from '../../commands/add-student-to-course/add-student-to-course.command';
import { RemoveStudentFromCourseCommand } from '../../commands/remove-student-from-course/remove-student-from-course.command';
import { UpdateStudentCommand } from '../../commands/update-student/update-student.command';

@Injectable()
export class StudentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(data: any, courseId: string) {
    return this.commandBus.execute(
      new AddStudentToCourseCommand(data, courseId)
    );
  }

  update(id: string, data: any) {
    return this.commandBus.execute(new UpdateStudentCommand(id, data));
  }

  delete(id: string, courseId: string) {
    return this.commandBus.execute(
      new RemoveStudentFromCourseCommand(id, courseId)
    );
  }
}
