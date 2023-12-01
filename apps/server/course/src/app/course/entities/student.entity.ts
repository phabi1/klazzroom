import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
@Schema({toJSON: {virtuals: true}})
export class Student {
  _id: Types.ObjectId;

  @Field(() => ID, { description: 'Student ID' })
  id: string;

  @Field({ description: 'Firstname' })
  @Prop()
  firstname: string;

  @Field({ description: 'Lastname' })
  @Prop()
  lastname: string;

  @Field({ description: 'Birthday' })
  @Prop()
  Birthday: Date;

  @Field({ description: 'Sex' })
  @Prop()
  sex: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
