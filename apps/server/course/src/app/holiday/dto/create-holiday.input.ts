import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHolidayInput {
  @Field()
  title: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field(() => [String])
  tags: string[];
}
