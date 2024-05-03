import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Item } from '../../entities/item.entity';
import { CreateItemInput } from '../../inputs/create-skill-item.input';
import { UpdateItemInput } from '../../inputs/update-skill-item.input';
import { ItemService } from '../../services/item/item.service';

@Resolver()
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item], {name: 'skillItemsByDomain'})
  async itemsByDomain(
    @Args('domain', { type: () => ID }) domain: string
  ): Promise<Item[]> {
    return this.itemService.findByDomain(domain);
  }

    @Query(() => Item, {name: 'skillItem'})
    async item(
        @Args('id', { type: () => ID }) id: string
    ): Promise<Item> {
        return this.itemService.findById(id);
    }

    @Mutation(() => Item, {name: 'createSkillItem'})
    async create(
        @Args('data') data: CreateItemInput
    ): Promise<Item> {
        return this.itemService.create(data);
    }

    @Mutation(() => Item, {name: 'updateSkillItem'})
    async update(
        @Args('id', { type: () => ID }) id: string,
        @Args('data') data: UpdateItemInput
    ): Promise<Item> {
        return this.itemService.update(id, data);
    }

    @Mutation(() => Item, {name: 'deleteSkillItem'})
    async delete(
        @Args('id', { type: () => ID }) id: string
    ): Promise<Item> {
        return this.itemService.remove(id);
    }
    
}
