import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Timetable, TimetableModel } from '../../models/timetable.model';
import { TimetableSchemaName } from '../../schemas/timetable.schema';
import { UpdateTimetableCommand } from './update-timetable.command';

@CommandHandler(UpdateTimetableCommand)
export class UpdateTimetableHandler
  implements ICommandHandler<UpdateTimetableCommand, Timetable>
{
  constructor(
    @InjectModel(TimetableSchemaName)
    private readonly model: TimetableModel
  ) {}

  async execute(command: UpdateTimetableCommand): Promise<Timetable> {
    const { id, data } = command;

    const timetable = await this.model.findById(id);
    if (!timetable) {
      throw new Error(`Timetable with id ${id} not found`);
    }

    if (data.title) {
      timetable.title = data.title;
    }
    if (data.tags) {
      timetable.tags = data.tags;
    }
    if (data.events) {
      timetable.events = data.events;
    }

    await timetable.save();
    return timetable;
  }
}
