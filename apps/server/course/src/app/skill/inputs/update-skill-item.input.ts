import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateSkillItemInput')
export class UpdateItemInput {
  @Field({ nullable: true })
  title: string;
}
