import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdministratorSpace } from '../types/space/administrator-space.type';
import { SpaceService } from '../../../domain/space/services/space.service';
import { TeacherSpace } from '../types/space/teacher-space.type';
import { Space, Spaces } from '../types/space.type';
import {
  CurrentUser,
  type Identity,
} from '@klazzroom/libs-server-graphql-subgraph-auth';

@Resolver()
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Query(() => Space)
  async space(
    @Args('id') id: string,
    @CurrentUser() user: Identity
  ): Promise<Spaces> {
    const space = await this.spaceService.findById(id);

    if (!space) {
      throw new Error('Space not found');
    }

    if (space.userId !== user.id) {
      throw new Error('User not authorized to access this space');
    }

    return space;
  }

  @Mutation(() => AdministratorSpace)
  async createAdministratorSpace(user: any): Promise<AdministratorSpace> {
    return this.spaceService.createAdministratorSpace({
      userId: user.id,
    });
  }

  @Mutation(() => TeacherSpace)
  async createTeacherSpace(
    @Args('title') title: string,
    @CurrentUser() user: Identity
  ): Promise<TeacherSpace> {
    if (!user) {
      throw new Error('User not authenticated');
    }
    return this.spaceService.createTeacherSpace({
      title,
      userId: user.id,
    });
  }
}
