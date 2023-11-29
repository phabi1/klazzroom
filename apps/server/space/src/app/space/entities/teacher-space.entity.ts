import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TeacherSpace {
  @Field(() => String, { description: 'Course ID' })
  course: string;
}
