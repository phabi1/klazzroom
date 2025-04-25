import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CourseCreatedEvent } from '../../events/course-created.event';
import { Course, type CourseModel } from '../../models/course.model';
import { CourseSchemaName } from '../../schemas/course.schema';
import { CreateCourseCommand } from './create-course.command';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler
  implements ICommandHandler<CreateCourseCommand, Course>
{
  constructor(
    @InjectModel(CourseSchemaName) private readonly model: CourseModel
  ) {}

  async execute(command: CreateCourseCommand): Promise<Course> {
    const { data } = command;

    const course = new this.model({
      gradeIds: data.gradeIds.map((id) => new Types.ObjectId(id)),
    });

    course.apply(new CourseCreatedEvent(course.id), 'prepend');

    await course.save();

    return course;
  }
}
