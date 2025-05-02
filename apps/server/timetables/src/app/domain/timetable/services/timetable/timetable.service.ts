import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTimetableCommand } from '../../commands/create-timetable/create-timetable.command';
import { UpdateTimetableCommand } from '../../commands/update-timetable/update-timetable.command';
import { Timetable } from '../../models/timetable.model';
import { GetTimetableQuery } from '../../queries/get-timetable/get-timetable.query';
import { GetTimetablesByTagsQuery } from '../../queries/get-timetables-by-tags/get-timetables-by-tags.query';

@Injectable()
export class TimetableService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  itemsByTags(tags: string[]): Promise<Timetable[]> {
    return this.queryBus.execute(new GetTimetablesByTagsQuery(tags));
  }

  item(id: string): Promise<Timetable> {
    return this.queryBus.execute(new GetTimetableQuery(id));
  }

  create(data: { title: string; tags: string[] }): Promise<Timetable> {
    return this.commandBus.execute(new CreateTimetableCommand(data));
  }

  update(
    id: string,
    data: { title?: string; tags?: string[] }
  ): Promise<Timetable> {
    return this.commandBus.execute(new UpdateTimetableCommand(id, data));
  }

  delete(id: string): Promise<Timetable> {
    throw new Error('Method not implemented.');
  }
}
