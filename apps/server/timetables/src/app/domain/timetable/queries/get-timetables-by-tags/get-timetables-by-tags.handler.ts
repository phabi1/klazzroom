import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTimetablesByTagsQuery } from './get-timetables-by-tags.query';
import { Timetable, TimetableModel } from '../../models/timetable.model';
import { InjectModel } from '@nestjs/mongoose';
import { TimetableSchemaName } from '../../schemas/timetable.schema';

@QueryHandler(GetTimetablesByTagsQuery)
export class GetTimetablesByTagsHandler
  implements IQueryHandler<GetTimetablesByTagsQuery, Timetable[]>
{
  constructor(
    @InjectModel(TimetableSchemaName)
    private readonly timetableModel: TimetableModel
  ) {}

  async execute(query: GetTimetablesByTagsQuery): Promise<Timetable[]> {
    const { tags } = query;
    return this.timetableModel.find({ tags: { $in: tags } }).exec();
  }
}
