import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimetableInput {
  @Field(() => String)
  title: string;
  @Field(() => [String], { nullable: 'items' })
  tags: string[];
}
