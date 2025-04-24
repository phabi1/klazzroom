import { Plugin } from '@klazzroom/libs-server-mongoose-cqrs';
import { Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import { GradeSchema, GradeSchemaName } from './schemas/grade.schema';
import { GradeService } from './services/grade.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: GradeSchemaName,
        useFactory: (eventBus: EventBus) => {
          const schema = GradeSchema;
          schema.plugin(Plugin, {
            autoCommit: true,
            eventBus,
          });
          return schema;
        },
        inject: [EventBus],
      },
    ]),
  ],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS, GradeService],
  exports: [GradeService],
})
export class GradeModule {}
