import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTimetableInput } from './create-timetable.input';
import { EventInput } from './event.input';

@InputType()
export class UpdateTimetableInput extends PartialType(CreateTimetableInput) {

  @Field(() => [EventInput], {description: 'Timetable events'})
  events: EventInput[];
}
