import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourseCommand } from './create-course.command';
import { Course, type CourseModel } from '../../models/course.model';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchemaName } from '../../schemas/course.schema';
import { GradeService } from '../../../grade/services/grade.service';
import { Types } from 'mongoose';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler
  implements ICommandHandler<CreateCourseCommand, Course>
{
  constructor(
    @InjectModel(CourseSchemaName) private readonly model: CourseModel,
    private readonly gradeService: GradeService
  ) {}

  async execute(command: CreateCourseCommand): Promise<Course> {
    const { data } = command;

    const grades = await this.gradeService.itemsByIds(data.gradeIds);

    const course = new this.model({
      grades: grades.map((grade) => ({
        _id: new Types.ObjectId(grade.id),
      })),
    });

    await course.save();
    return course;
  }
}
