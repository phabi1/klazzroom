import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddStudentToCourseCommand } from './add-student-to-course.command';
import { Student } from '../../models/student.model';
import { CourseModel } from '../../models/course.model';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchemaName } from '../../schemas/course.schema';
import { Types } from 'mongoose';

@CommandHandler(AddStudentToCourseCommand)
export class AddStudentToCourseHandler
  implements ICommandHandler<AddStudentToCourseCommand, Student>
{
  constructor(
    @InjectModel(CourseSchemaName)
    private readonly model: CourseModel
  ) {}

  async execute(command: AddStudentToCourseCommand): Promise<Student> {
    const { data, courseId } = command;

    const course = await this.model.findById(courseId).exec();
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    const student = {
      id: new Types.ObjectId().toString(),
      firstname: data.firstname,
      lastname: data.lastname,
      gradeId: data.gradeId,
      birthday: data.birthday,
      avatarUrl: data.avatarUrl,
      sex: data.sex,
    };
    course.students.push(student);

    await course.save();
    return student;
  }
}
