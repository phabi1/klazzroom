import { Field, ID, InputType } from '@nestjs/graphql';
import { StudentSex } from '../../../domain/course/models/student-sex.model';
import '../types/student-sex.type';

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => ID)
  gradeId: string;
  @Field(() => Date, { nullable: true })
  birthday: Date | null;
  @Field(() => StudentSex, { nullable: true })
  sex: StudentSex;
}
