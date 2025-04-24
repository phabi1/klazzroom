import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStudentCommand } from './update-student.command';
import { Student } from '../../models/student.model';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchemaName } from '../../schemas/course.schema';
import { CourseModel } from '../../models/course.model';
import { Types } from 'mongoose';

@CommandHandler(UpdateStudentCommand)
export class UpdateStudentHandler
  implements ICommandHandler<UpdateStudentCommand, Student>
{
  constructor(
    @InjectModel(CourseSchemaName)
    private readonly model: CourseModel
  ) {}

  async execute(command: UpdateStudentCommand): Promise<Student> {
    const { id, data } = command;
    const course = await this.model.findOne({
      'students._id': new Types.ObjectId(id),
    });

    if (!course) {
      throw new Error(`Course with student ID ${id} not found`);
    }
    const student = course.students.find((student) => student.id === id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
    if (data.firstname) {
      student.firstname = data.firstname;
    }
    if (data.lastname) {
      student.lastname = data.lastname;
    }

    if (data.gradeId) {
      student.gradeId = data.gradeId;
    }

    if (data.birthday) {
      student.birthday = data.birthday;
    }

    if (data.sex) {
      student.sex = data.sex;
    }

    await course.save();
    return student;
  }
}
