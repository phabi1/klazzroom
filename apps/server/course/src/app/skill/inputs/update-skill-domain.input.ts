import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateSkillDomainInput')
export class UpdateDomainInput {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  color: string;
}
