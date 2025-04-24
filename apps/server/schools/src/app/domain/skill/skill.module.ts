import { Plugin } from '@klazzroom/libs-server-mongoose-cqrs';
import { Module } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import { SkillSchema, SkillSchemaName } from './schemas/skill.schema';
import { SkillService } from './services/skill.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SkillSchemaName,
        useFactory: (eventBus: EventBus) => {
          const schema = SkillSchema;
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
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS, SkillService],
    exports: [SkillService],
})
export class SkillModule {}
