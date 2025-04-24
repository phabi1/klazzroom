import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Grade, type GradeModel } from '../../models/grade.model';
import { GradeSchemaName } from '../../schemas/grade.schema';
import { CreateGradeCommand } from './create-grade.command';

@CommandHandler(CreateGradeCommand)
export class CreateGradeHandler
  implements ICommandHandler<CreateGradeCommand, Grade>
{
  constructor(
    @InjectModel(GradeSchemaName) private readonly model: GradeModel
  ) {}

  async execute(command: CreateGradeCommand): Promise<Grade> {
    const grade = new this.model(command.data);
    await grade.save();
    return grade;
  }
}
