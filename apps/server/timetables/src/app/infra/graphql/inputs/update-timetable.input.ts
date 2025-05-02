import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateTimetableInput } from './create-timetable.input';
import { TimetableEventInput } from './timetable-event.input';

@InputType()
export class UpdateTimetableInput extends PartialType(CreateTimetableInput) {
  @Field(() => ID)
  id: string;
  @Field(() => [TimetableEventInput], { nullable: 'itemsAndList' })
  events?: TimetableEventInput[];
}
