import { Plugin as MongooseCqrsPlugin } from '@klazzroom/libs-server-mongoose-cqrs';
import { forwardRef, Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeModule } from '../grade/grade.module';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import { CourseSchema, CourseSchemaName } from './schemas/course.schema';
import { CourseService } from './services/course/course.service';
import { StudentService } from './services/student/student.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CourseSchemaName,
        useFactory: (eventBus: EventBus) => {
          const schema = CourseSchema;
          schema.plugin(MongooseCqrsPlugin, { eventBus });
          return schema;
        },
        inject: [EventBus],
      },
    ]),
    forwardRef(() => GradeModule),
  ],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    CourseService,
    StudentService,
  ],
  exports: [CourseService, StudentService],
})
export class CourseModule {}
