import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timetable, TimetableSchema } from './entities/timetable.entity';
import { TimetableResolver } from './resolvers/timetable.resolver';
import { TimetableService } from './services/timetable.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timetable.name, schema: TimetableSchema },
    ]),
  ],
  providers: [TimetableResolver, TimetableService],
})
export class TimetableModule {}
