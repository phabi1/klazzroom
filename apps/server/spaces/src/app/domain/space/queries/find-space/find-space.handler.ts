import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space, SpaceSchemaName } from '../../models/space.base';
import { FindSpaceQuery } from './find-space.query';

@QueryHandler(FindSpaceQuery)
export class FindSpaceHandler
  implements IQueryHandler<FindSpaceQuery, Space | null>
{
  constructor(
    @InjectModel(SpaceSchemaName) private readonly spaceModel: Model<Space>
  ) {}

  async execute(query: FindSpaceQuery): Promise<Space | null> {
    return this.spaceModel.findById(query.id).exec();
  }
}
