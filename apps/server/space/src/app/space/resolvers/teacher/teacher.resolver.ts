import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Space } from '../../entities/space.entity';
import { CreateTeacherSpaceInput } from '../../inputs/create-teacher-space.input';
import { SpaceService } from '../../services/space.service';
import { UpdateTeacherSpaceInput } from '../../inputs/update-teacher-space.input';
import { CurrentUser } from '@klazzroom/server-common-auth';

@Resolver()
export class TeacherResolver {
  constructor(private readonly spaceService: SpaceService) {}

  @Mutation(() => Space)
  createTeacherSpace(
    @Args('input') createSpaceInput: CreateTeacherSpaceInput,
    @CurrentUser() uid: string
  ) {
    return this.spaceService.createTeacher(createSpaceInput, uid);
  }

  @Mutation(() => Space)
  updateTeacherSpace(@Args('input') updateSpaceInput: UpdateTeacherSpaceInput) {
    return this.spaceService.update(updateSpaceInput.id, updateSpaceInput);
  }
}
