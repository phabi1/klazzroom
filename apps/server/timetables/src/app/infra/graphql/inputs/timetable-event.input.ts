import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class TimetableEventInput {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String)
  title: string;
  @Field(() => Date)
  startAt: Date;
  @Field(() => Date)
  endAt: Date;
  @Field(() => String)
  type: string;
  @Field(() => String, { nullable: true })
  skillId: string;
  @Field(() => [String], { nullable: 'items' })
  grades: string[];
}
