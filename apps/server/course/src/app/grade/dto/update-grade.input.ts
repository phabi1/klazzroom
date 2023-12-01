import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateGradeInput } from './create-grade.input';

@InputType()
export class UpdateGradeInput extends PartialType(CreateGradeInput) {
  @Field(() => ID)
  id: string;
}
