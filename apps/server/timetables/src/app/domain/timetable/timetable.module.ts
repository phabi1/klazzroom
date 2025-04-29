import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TimetableSchema,
  TimetableSchemaName,
} from './schemas/timetable.schema';
import { COMMAND_HANDLERS } from './commands';
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
  providers: [...COMMAND_HANDLERS, TimetableService],
})
export class TimetableModule {}
