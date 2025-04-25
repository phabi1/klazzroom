import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseModel } from '../../models/course.model';
import { CourseSchemaName } from '../../schemas/course.schema';
import { UpdateCourseCommand } from './update-course.command';
import { CourseNotFoundException } from '../../exceptions/course-not-found.exception';

@CommandHandler(UpdateCourseCommand)
export class UpdateCourseHandler
  implements ICommandHandler<UpdateCourseCommand, Course>
{
  constructor(
    @InjectModel(CourseSchemaName) private readonly model: CourseModel
  ) {}

  async execute(command: UpdateCourseCommand): Promise<Course> {
    const { id, data } = command;

    const course = await this.model.findById(id);
    if (!course) {
      throw CourseNotFoundException.withId(id);
    }

    if (data.gradeIds) {
      course.gradeIds = data.gradeIds;
    }
    if (data.holidayZone) {
      course.holidayZone = data.holidayZone;
    }
    await course.save();
    return course;
  }
}
