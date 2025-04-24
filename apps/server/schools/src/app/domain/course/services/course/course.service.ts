import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCourseCommand } from '../../commands/create-course/create-course.command';
import { DeleteCourseCommand } from '../../commands/delete-course/delete-course.command';
import { Course } from '../../models/course.model';
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

  create(data: any): Promise<Course> {
    return this.commandBus.execute(new CreateCourseCommand(data));
  }

  delete(id: string) {
    return this.commandBus.execute(new DeleteCourseCommand(id));
  }
}
