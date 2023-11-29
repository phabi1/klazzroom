import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeacherSpaceInput {
  @Field(() => String, { description: 'Title of space' })
  title: string;
}
