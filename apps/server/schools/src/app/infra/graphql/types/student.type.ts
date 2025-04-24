import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentSex } from '../../../domain/course/models/student-sex.model';
import { Grade } from './grade.type';
import './student-sex.type';

@ObjectType()
@Directive('@key(fields: "id")')
export class Student {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  firstname: string;
  @Field(() => String)
  lastname: string;
  @Field(() => Grade)
  grade: Grade;
  @Field(() => Date, { nullable: true })
  birthday: Date | null;
  @Field(() => String)
  avatarUrl: string;
  @Field(() => StudentSex, { nullable: true })
  sex: StudentSex;
}
