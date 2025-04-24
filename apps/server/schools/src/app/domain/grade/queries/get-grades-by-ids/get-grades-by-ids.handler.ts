import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Grade, type GradeModel } from '../../models/grade.model';
import { GradeSchemaName } from '../../schemas/grade.schema';
import { GetGradesByIdsQuery } from './get-grades-by-ids.query';

@QueryHandler(GetGradesByIdsQuery)
export class GetGradesByIdsHandler
  implements IQueryHandler<GetGradesByIdsQuery, Grade[]>
{
  constructor(
    @InjectModel(GradeSchemaName)
    private readonly gradeModel: GradeModel // Replace with actual model type
  ) {}

  async execute(query: GetGradesByIdsQuery): Promise<Grade[]> {
    const { ids } = query;
    return this.gradeModel
      .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
      .exec();
  }
}
