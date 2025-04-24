import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Grade, type GradeModel } from '../../models/grade.model';
import { GradeSchemaName } from '../../schemas/grade.schema';
import { GetGradesQuery } from './get-grades.query';

@QueryHandler(GetGradesQuery)
export class GetGradesHandler
  implements IQueryHandler<GetGradesQuery, Grade[]>
{
  constructor(
    @InjectModel(GradeSchemaName) private readonly model: GradeModel
  ) {}

  async execute(): Promise<Grade[]> {
    return this.model.find().exec();
  }
}
