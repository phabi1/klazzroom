import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Timetable } from '../../models/timetable.model';
import { GetTimetablesByTagsQuery } from '../../queries/get-timetables-by-tags.query';
import { CreateTimetableCommand } from '../../commands/create-timetable/create-timetable.command';

@Injectable()
export class TimetableService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  itemsByTags(tags: string[]): Promise<Timetable[]> {
    return this.queryBus.execute(new GetTimetablesByTagsQuery(tags));
  }

  create(data: { title: string; tags: string[] }): Promise<Timetable> {
    return this.commandBus.execute(
      new CreateTimetableCommand(data.title, data.tags)
    );
  }
}
