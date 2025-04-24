import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => ID)
  gradeId: string;
}
