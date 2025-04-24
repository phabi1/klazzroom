import { Field, ID, InputType } from '@nestjs/graphql';
import { StudentSex } from '../../../domain/course/models/student-sex.model';
import '../types/student-sex.type';

@InputType()
export class UpdateStudentInput {
  @Field(() => String, { nullable: true })
  firstname: string;
  @Field(() => String, { nullable: true })
  lastname: string;
  @Field(() => ID, { nullable: true })
  gradeId: string;
  @Field(() => Date, { nullable: true })
  birthday: Date | null;
  @Field(() => StudentSex, { nullable: true })
  sex: StudentSex;
}
