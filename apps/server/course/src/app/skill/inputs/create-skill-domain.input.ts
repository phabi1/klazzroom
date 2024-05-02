import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field()
  title: string;

  @Field()
  color: string;
}
