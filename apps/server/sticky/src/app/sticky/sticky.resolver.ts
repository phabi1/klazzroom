import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { StickyService } from './sticky.service';
import { Sticky } from './entities/sticky.entity';
import { CreateStickyInput } from './dto/create-sticky.input';
import { UpdateStickyInput } from './dto/update-sticky.input';

@Resolver(() => Sticky)
export class StickyResolver {
  constructor(private readonly stickyService: StickyService) {}

  @Mutation(() => Sticky)
  createSticky(
    @Args('input') input: CreateStickyInput
  ) {
    return this.stickyService.create(input);
  }

  @Query(() => [Sticky], { name: 'sticky' })
  findAll(@Args('tags', { type: () => [String], nullable: 'items' }) tags: string[]){
    return this.stickyService.findByTags(tags);
  }

  @Query(() => Sticky, { name: 'sticky' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.stickyService.findOne(id);
  }

  @Mutation(() => Sticky)
  updateSticky(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStickyInput
  ) {
    return this.stickyService.update(id, input);
  }

  @Mutation(() => Sticky)
  removeSticky(@Args('id', { type: () => ID }) id: string) {
    return this.stickyService.remove(id);
  }
}
