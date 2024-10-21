import { Plugin as MongooseCqrsPlugin } from '@klazzroom/libs-server-mongoose-cqrs';
import { Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { AdministratorSpaceSchema } from './entities/administrator-space.entity';
import { SpaceEntity, SpaceSchema } from './entities/space.entity';
import { TeacherSpaceSchema } from './entities/teacher-space.entity';
import { QUERY_HANDLERS } from './queries';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SpaceEntity.name,
        useFactory: (eventBus: EventBus) => {
          SpaceSchema.plugin(MongooseCqrsPlugin, { eventBus });

          [AdministratorSpaceSchema, TeacherSpaceSchema].forEach(
            (schema: any) => schema.plugin(MongooseCqrsPlugin, { eventBus })
          );
          return SpaceSchema;
        },
        collection: 'spaces',
        discriminators: [
          { name: 'administrator', schema: AdministratorSpaceSchema },
          { name: 'teacher', schema: TeacherSpaceSchema },
        ],
        inject: [EventBus],
      },
    ]),
  ],
  providers: [...QUERY_HANDLERS, ...COMMAND_HANDLERS],
})
export class SpaceModule {}
