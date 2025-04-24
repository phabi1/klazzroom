import { Plugin } from '@klazzroom/libs-server-mongoose-cqrs';
import { Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { SpaceSchemaName } from './models/space.base';
import { QUERY_HANDLERS } from './queries';
import {
  AdministratorSpaceSchema,
  AdministratorSpaceSchemaName,
} from './schemas/administrator-space.schema';
import { SpaceSchema } from './schemas/space.schema';
import {
  TeacherSpaceSchema,
  TeacherSpaceSchemaName,
} from './schemas/teacher-space.schema';
import { SpaceService } from './services/space.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SpaceSchemaName,
        useFactory: (eventBus: EventBus) => {
          const schema = SpaceSchema;
          schema.plugin(Plugin, {
            autoCommit: true,
            eventBus,
          });
          return schema;
        },
        discriminators: [
          {
            name: AdministratorSpaceSchemaName,
            schema: AdministratorSpaceSchema,
          },
          {
            name: TeacherSpaceSchemaName,
            schema: TeacherSpaceSchema,
          },
        ],
        inject: [EventBus],
      },
    ]),
  ],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS, SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
