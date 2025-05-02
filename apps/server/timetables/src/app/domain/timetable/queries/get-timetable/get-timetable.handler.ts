import { IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timetable } from '../../models/timetable.model';
import { GetTimetableQuery } from './get-timetable.query';
import { TimetableSchemaName } from '../../schemas/timetable.schema';

export class GetTimetableHandler
  implements IQueryHandler<GetTimetableQuery, Timetable>
{
  constructor(
    @InjectModel(TimetableSchemaName)
    private readonly timetableModel: Model<Timetable>
  ) {}

  async execute(query: GetTimetableQuery): Promise<Timetable> {
    const { id } = query;
    return this.timetableModel.findById(id).exec();
  }
}
