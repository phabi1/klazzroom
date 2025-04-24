import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseModel } from '../../models/course.model';
import { CourseSchemaName } from '../../schemas/course.schema';
import { GetCourseQuery } from './get-course.query';

@QueryHandler(GetCourseQuery)
export class GetCourseHandler implements IQueryHandler<GetCourseQuery, Course> {
  constructor(
    @InjectModel(CourseSchemaName) private readonly model: CourseModel
  ) {}

  async execute(query: GetCourseQuery): Promise<Course> {
    const { id } = query;
    const course = await this.model.findById(id).exec();
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }
}
