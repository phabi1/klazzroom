import {
    Directive,
    Field,
    ID,
    ObjectType
} from '@nestjs/graphql';
import { Grade } from './grade.type';
import { Student } from './student.type';

@ObjectType()
@Directive('@key(fields: "id")')
export class Course {
  @Field(() => ID)
  id: string;

  @Field(() => [Grade])
  grades: Grade[];

  @Field(() => String)
  holidayZone: string;

  @Field(() => [Student], { nullable: 'items' })
  students: Student[];
}
