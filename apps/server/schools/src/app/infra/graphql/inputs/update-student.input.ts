import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput {
  @Field(() => String, { nullable: true })
  firstname: string;
  @Field(() => String, { nullable: true })
  lastname: string;
  @Field(() => ID, { nullable: true })
  gradeId: string;
}
