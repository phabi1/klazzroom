import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateHolidayInput } from '../dto/create-holiday.input';
import { UpdateHolidayInput } from '../dto/update-holiday.input';
import { Holiday } from '../entities/holiday.entity';
import { HolidayService } from '../services/holiday.service';

@Resolver(() => Holiday)
export class HolidayResolver {
  constructor(private readonly holidayService: HolidayService) {}

  @Mutation(() => Holiday)
  createHoliday(@Args('data') createHolidayInput: CreateHolidayInput) {
    return this.holidayService.create(createHolidayInput);
  }

  @Query(() => [Holiday], { name: 'holidays' })
  findAll(
    @Args('tags', { type: () => [String], nullable: 'items' }) tags: string[]
  ) {
    return this.holidayService.findByTags(tags);
  }

  @Query(() => Holiday, { name: 'holiday' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.holidayService.findOne(id);
  }

  @Mutation(() => Holiday)
  updateHoliday(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') updateHolidayInput: UpdateHolidayInput
  ) {
    return this.holidayService.update(id, updateHolidayInput);
  }

  @Mutation(() => Holiday)
  removeHoliday(@Args('id', { type: () => ID }) id: string) {
    return this.holidayService.remove(id);
  }
}
