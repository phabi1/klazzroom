import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStickyInput {
  @Field()
  title: string;

  @Field()
  data: string;

  @Field(() => [String], { nullable: 'items'})
  tags: string[];
}
