import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Space } from '../models/space.base';
import { FindSpacesByUserQuery } from '../queries/find-spaces-by-user/find-by-user.query';
import { CreateAdministratorSpaceCommand } from '../commands/create-administrator-space/create-administrator-space.command';
import { CreateTeacherSpaceCommand } from '../commands/create-teacher-space/create-teacher-space.command';
import { FindSpaceQuery } from '../queries/find-space/find-space.query';
import { TeacherSpace } from '../models/teacher-space..model';
import { AdministratorSpace } from '../models/administrator-space.model';

@Injectable()
export class SpaceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  findById(id: string): Promise<Space | null> {
    if (!id) {
      throw new Error('Space ID is required');
    }
    return this.queryBus.execute<FindSpaceQuery, Space | null>(
      new FindSpaceQuery(id)
    );
  }

  findByUser(userId: string): Promise<Space[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.queryBus.execute<FindSpacesByUserQuery, Space[]>(
      new FindSpacesByUserQuery(userId)
    );
  }

  createAdministratorSpace(data: {
    userId: string;
  }): Promise<AdministratorSpace> {
    return this.commandBus.execute(
      new CreateAdministratorSpaceCommand({
        title: 'Administrator Space',
        userId: data.userId,
      })
    );
  }

  createTeacherSpace(data: {
    title: string;
    userId: string;
  }): Promise<TeacherSpace> {
    return this.commandBus.execute(
      new CreateTeacherSpaceCommand({
        title: data.title,
        userId: data.userId,
      })
    );
  }
}
