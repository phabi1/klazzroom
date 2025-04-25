import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Course, type CourseModel } from '../../models/course.model';
import { DeleteCourseCommand } from './delete-course.command';
import { CourseSchemaName } from '../../schemas/course.schema';
import { CourseNotFoundException } from '../../exceptions/course-not-found.exception';
import { CourseDeletedEvent } from '../../events/course-deleted.event';

export class DeleteCourseHandler
  implements ICommandHandler<DeleteCourseCommand, Course>
{
  constructor(
    @InjectModel(CourseSchemaName)
    private readonly courseModel: CourseModel
  ) {}

  async execute(command: DeleteCourseCommand): Promise<Course> {
    const { id } = command;

    const course = await this.courseModel.findById(id);
    if (!course) {
      throw CourseNotFoundException.withId(id);
    }

    course.apply(new CourseDeletedEvent(course.id));

    await course.deleteOne();

    return course;
  }
}
