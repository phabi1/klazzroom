import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimetableInput {
  @Field(() => String, { description: 'Timetable title' })
  title: string;

  @Field(() => [String])
  tags: string[];
}
