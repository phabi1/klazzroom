import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { TimetableEvent } from './timetable-event.type';

@ObjectType()
@Directive('@key(fields: "id")')
export class Timetable {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => [TimetableEvent], { nullable: 'items' })
  events: TimetableEvent[];
  @Field(() => [String])
  tags: string[];
}
