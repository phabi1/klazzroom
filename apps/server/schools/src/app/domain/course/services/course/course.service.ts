import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCourseCommand } from '../../commands/create-course/create-course.command';
import { DeleteCourseCommand } from '../../commands/delete-course/delete-course.command';
import { UpdateCourseCommand } from '../../commands/update-course/update-course.command';
import { Course } from '../../models/course.model';
import { CreateCourseData } from '../../models/create-course-data.model';
import { UpdateCourseData } from '../../models/update-course-data.model';
import { GetCourseQuery } from '../../queries/get-course/get-course.query';

@Injectable()
export class CourseService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  item(id: string): Promise<Course> {
    return this.queryBus.execute(new GetCourseQuery(id));
  }

  create(data: CreateCourseData): Promise<Course> {
    return this.commandBus.execute(new CreateCourseCommand(data));
  }

  update(id: string, data: UpdateCourseData): Promise<Course> {
    return this.commandBus.execute(new UpdateCourseCommand(id, data));
  }

  delete(id: string) {
    return this.commandBus.execute(new DeleteCourseCommand(id));
  }
}
