import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTimetableInput } from './create-timetable.input';
import { EventInput } from './event.input';

@InputType()
export class UpdateTimetableInput extends PartialType(CreateTimetableInput) {
  @Field({ nullable: true })
  title: string;

  @Field(() => [EventInput], {
    description: 'Timetable events',
    nullable: true,
  })
  events: EventInput[];
}
