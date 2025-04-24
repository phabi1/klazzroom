import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import {
  Space,
  type SpaceModel,
  SpaceSchemaName,
} from '../../models/space.base';
import { FindSpacesByUserQuery } from './find-by-user.query';

@QueryHandler(FindSpacesByUserQuery)
export class FindSpacesByUserHandler
  implements IQueryHandler<FindSpacesByUserQuery, Space[]>
{
  constructor(
    @InjectModel(SpaceSchemaName) private readonly spaceModel: SpaceModel
  ) {}

  execute(query: FindSpacesByUserQuery): Promise<Space[]> {
    return this.spaceModel.find({
      userId: query.userId,
    }).exec();
  }
}
