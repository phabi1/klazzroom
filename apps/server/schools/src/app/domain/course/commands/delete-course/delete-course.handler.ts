import { ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Course, type CourseModel } from '../../models/course.model';
import { DeleteCourseCommand } from './delete-course.command';
import { CourseSchemaName } from '../../schemas/course.schema';

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
      throw new Error(`Course with id ${id} not found`);
    }

    await course.deleteOne();
    return course;
  }
}
