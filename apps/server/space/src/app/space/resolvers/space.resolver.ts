import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpaceService } from '../space.service';
import { Space } from '../entities/space.entity';
import { CreateTeacherSpaceInput } from '../inputs/create-teacher-space.input';
import { UpdateTeacherSpaceInput } from '../inputs/update-teacher-space.input';

@Resolver(() => Space)
export class SpaceResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Mutation(() => Space)
  createSpace(@Args('input') createSpaceInput: CreateTeacherSpaceInput) {
    return this.spaceService.create(createSpaceInput);
  }

  @Query(() => [Space], { name: 'space' })
  findAll() {
    return this.spaceService.findAll();
  }

  @Query(() => Space, { name: 'space' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.spaceService.findOne(id);
  }

  @Mutation(() => Space)
  updateSpace(@Args('input') updateSpaceInput: UpdateTeacherSpaceInput) {
    return this.spaceService.update(updateSpaceInput.id, updateSpaceInput);
  }

  @Mutation(() => Space)
  removeSpace(@Args('id', { type: () => String }) id: string) {
    return this.spaceService.remove(id);
  }
}
