import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Grade } from '../../grade/entities/grade.entity';
import { Sex } from '../enums/sex.enum';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Student {
  _id: Types.ObjectId;

  @Field(() => ID, { description: 'Student ID' })
  id: string;

  @Field({ description: 'Firstname of student' })
  @Prop()
  firstname: string;

  @Field({ description: 'Lastname of student' })
  @Prop()
  lastname: string;

  @Field(() => Grade, { description: 'Grade of student' })
  @Prop({ type: Types.ObjectId, ref: 'Grade' })
  grade: Types.ObjectId;

  @Field({ description: 'Birthday of student', nullable: true })
  @Prop()
  birthday: Date | null;

  @Field(() => Sex, { description: 'Sex of student' })
  @Prop({ type: Number, enum: Sex , default: Sex.Unknown })
  sex: Sex;

  @Field({ description: 'Commants' })
  @Prop({ default: '' })
  comments: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
