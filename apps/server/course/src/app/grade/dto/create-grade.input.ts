import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGradeInput {
  @Field(() => String, { description: 'Title of grade' })
  title: string;
}
