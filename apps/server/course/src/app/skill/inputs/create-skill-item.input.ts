import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('CreateSkillItemInput')
export class CreateItemInput {
  @Field()
  title: string;

  @Field(() => ID)
  domain: string;
}
