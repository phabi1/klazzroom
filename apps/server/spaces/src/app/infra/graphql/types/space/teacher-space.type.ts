import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class TeacherSpace {
  @Field(() => ID)
  id!: string;
  @Field()
  title!: string;
  @Field(() => ID)
  courseId!: string;
}
