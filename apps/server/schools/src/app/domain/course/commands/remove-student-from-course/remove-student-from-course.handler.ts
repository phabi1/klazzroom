import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CourseModel } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { CourseSchemaName } from '../../schemas/course.schema';
import { RemoveStudentFromCourseCommand } from './remove-student-from-course.command';

@CommandHandler(RemoveStudentFromCourseCommand)
export class RemoveStudentFromCourseHandler
  implements ICommandHandler<RemoveStudentFromCourseCommand, Student>
{
  constructor(
    @InjectModel(CourseSchemaName)
    private readonly model: CourseModel
  ) {}

  async execute(command: RemoveStudentFromCourseCommand): Promise<Student> {
    const { studentId, courseId } = command;
    const course = await this.model.findById(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    const studentIndex = course.students.findIndex(
      (student) => student.id === studentId
    );
    if (studentIndex === -1) {
      throw new Error(
        `Student with ID ${studentId} not found in course ${courseId}`
      );
    }
    const student = course.students[studentIndex];
    course.students.splice(studentIndex, 1);
    await course.save();
    return student;
  }
}
