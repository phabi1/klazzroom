import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTimetableInput } from '../dto/create-timetable.input';
import { UpdateTimetableInput } from '../dto/update-timetable.input';
import { Timetable } from '../entities/timetable.entity';
import { TimetableService } from '../services/timetable.service';

@Resolver(() => Timetable)
export class TimetableResolver {
  constructor(private readonly timetableService: TimetableService) {}

  @Mutation(() => Timetable)
  createTimetable(@Args('input') createTimetableInput: CreateTimetableInput) {
    return this.timetableService.create(createTimetableInput);
  }

  @Query(() => [Timetable], { name: 'timetables' })
  findAll(@Args('tags', {type: () => [String], nullable: 'items'}) tags: []) {
    return this.timetableService.findAll(tags);
  }

  @Query(() => Timetable, { name: 'timetable' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.timetableService.findOne(id);
  }

  @Mutation(() => Timetable)
  updateTimetable(
    @Args('id', {type: () => ID}) id: string,
    @Args('input') updateTimetableInput: UpdateTimetableInput) {
    return this.timetableService.update(
      id,
      updateTimetableInput
    );
  }

  @Mutation(() => Timetable)
  removeTimetable(@Args('id', { type: () => ID }) id: string) {
    return this.timetableService.remove(id);
  }
}
