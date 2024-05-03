import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateSkillDomainInput')
export class CreateDomainInput {
  @Field()
  title: string;

  @Field()
  color: string;
}
