import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimetableService } from '../../../../domain/timetable/services/timetable/timetable.service';
import { Timetable } from '../../types/timetable.type';
import { CreateTimetableInput } from '../../inputs/create-timetable.input';
import { UpdateTimetableInput } from '../../inputs/update-timetable.input';

@Resolver()
export class TimetableResolver {
  constructor(private timetableService: TimetableService) {}

  @Query(() => [Timetable])
  timetablesByTags(
    @Args('tags', { type: () => [String] }) tags: string[]
  ): Promise<Timetable[]> {
    return this.timetableService.itemsByTags(tags);
  }

  @Query(() => Timetable)
  async timetable(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Timetable> {
    return this.timetableService.item(id);
  }

  @Mutation(() => Timetable)
  async createTimetable(
    @Args('input') input: CreateTimetableInput
  ): Promise<Timetable> {
    return this.timetableService.create(input);
  }

  @Mutation(() => Timetable)
  async updateTimetable(
    @Args('input') input: UpdateTimetableInput
  ): Promise<Timetable> {
    const { id, ...data } = input;
    return this.timetableService.update(id, data);
  }

  @Mutation(() => Timetable)
  async deleteTimetable(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Timetable> {
    return this.timetableService.delete(id);
  }
}
