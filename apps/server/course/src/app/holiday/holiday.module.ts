import { Module } from '@nestjs/common';
import { HolidayService } from './services/holiday.service';
import { HolidayResolver } from './resolvers/holiday.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Holiday, HolidaySchema } from './entities/holiday.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Holiday.name, schema: HolidaySchema }]),
  ],
  providers: [HolidayResolver, HolidayService],
})
export class HolidayModule {}
