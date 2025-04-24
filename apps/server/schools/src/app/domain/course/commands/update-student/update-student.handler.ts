import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStudentCommand } from './update-student.command';
import { Student } from '../../models/student.model';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchemaName } from '../../schemas/course.schema';
import { CourseModel } from '../../models/course.model';

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
      'students.id': id,
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

    await course.save();
    return student;
  }
}
