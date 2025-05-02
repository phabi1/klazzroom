import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTimetableCommand } from './create-timetable.command';
import { Timetable, TimetableModel } from '../../models/timetable.model';
import { InjectModel } from '@nestjs/mongoose';
import { TimetableSchemaName } from '../../schemas/timetable.schema';

@CommandHandler(CreateTimetableCommand)
export class CreateTimetableHandler
  implements ICommandHandler<CreateTimetableCommand, Timetable>
{
  constructor(
    @InjectModel(TimetableSchemaName) private readonly model: TimetableModel
  ) {}

  async execute(command: CreateTimetableCommand): Promise<Timetable> {
    const { data } = command;

    const timetable = new this.model();
    timetable.title = data.title;
    timetable.tags = data.tags;

    await timetable.save();

    return timetable;
  }
}
