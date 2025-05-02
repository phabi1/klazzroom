import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import {
  TimetableSchema,
  TimetableSchemaName,
} from './schemas/timetable.schema';
import { TimetableService } from './services/timetable/timetable.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TimetableSchemaName,
        useFactory: () => TimetableSchema,
      },
    ]),
  ],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS, TimetableService],
  exports: [TimetableService],
})
export class TimetableModule {}
