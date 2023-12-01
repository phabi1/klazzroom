import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.entity';
import { Grade } from '../../grade/entities/grade.entity';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Course {
  @Field(() => ID, { description: 'Course ID' })
  id: string;

  @Field(() => [String], { description: 'Worked days' })
  @Prop()
  days: string[];

  @Field(() => [Grade], {description: 'Grades in the course'})
  @Prop()
  grades: string[];

  @Field(() => [Student], { description: 'Students in the course' })
  @Prop({ type: [StudentSchema] })
  students: Student[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
