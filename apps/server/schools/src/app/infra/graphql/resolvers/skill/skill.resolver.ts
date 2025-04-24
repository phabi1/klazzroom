import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SkillService } from '../../../../domain/skill/services/skill.service';
import { Skill } from '../../types/skill.type';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [Skill])
  skills() {
    return this.skillService.items();
  }

  @Mutation(() => Skill)
  async createSkill(
    @Args('title') title: string,
    @Args('parent', { type: () => ID, nullable: true }) parent: string | null,
    @Args('color', { nullable: true }) color: string | null,
    @Args('weight', { nullable: true }) weight: number | null
  ): Promise<Skill> {
    return this.skillService.create({ title, parent, color, weight });
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Args('id', { type: () => ID }) id: string,
    @Args('title', { nullable: true }) title: string,
    @Args('parent', { type: () => ID, nullable: true }) parent: string | null,
    @Args('color', { nullable: true }) color: string | null,
    @Args('weight', { nullable: true }) weight: number | null
  ): Promise<Skill> {
    return this.skillService.update(id, { title, parent, color, weight });
  }

  @Mutation(() => Skill)
  async deleteSkill(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Skill> {
    return this.skillService.delete(id);
  }
}
