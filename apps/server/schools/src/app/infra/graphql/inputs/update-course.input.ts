import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field(() => [String], { nullable: true })
  gradeIds?: string[];
  @Field(() => String, { nullable: true })
  holidayZone?: string;
}
