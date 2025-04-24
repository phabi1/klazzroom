import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Grade, type GradeModel } from '../../models/grade.model';
import { GradeSchemaName } from '../../schemas/grade.schema';
import { UpdateGradeCommand } from './update-grade.command';

@CommandHandler(UpdateGradeCommand)
export class UpdateGradeHandler
  implements ICommandHandler<UpdateGradeCommand, Grade>
{
  constructor(
    @InjectModel(GradeSchemaName) private readonly model: GradeModel
  ) {}

  async execute(command: UpdateGradeCommand): Promise<Grade> {
    const { id, data } = command;
    const entity = await this.model.findById(id);

    if (!entity) {
      throw new Error(`Grade with id ${id} not found`);
    }

    if (data.name) {
      entity.name = data.name;
    }
    if (data.title) {
      entity.title = data.title;
    }
    if (data.weight !== undefined) {
      entity.weight = data.weight;
    }
    await entity.save();
    return entity;
  }
}
