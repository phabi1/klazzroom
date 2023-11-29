import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTeacherSpaceInput } from './create-teacher-space.input';

@InputType()
export class UpdateTeacherSpaceInput extends PartialType(CreateTeacherSpaceInput) {
  @Field(() => String, { description: 'Space ID' })
  id: string;
}
