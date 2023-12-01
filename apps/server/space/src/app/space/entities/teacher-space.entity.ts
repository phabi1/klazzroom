import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Space } from './space.entity';

@ObjectType()
@Schema()
export class TeacherSpace extends Space {
  @Field(() => String, { description: 'Course ID' })
  @Prop({ required: true })
  course: string;
}

export const TeacherSpaceSchema = SchemaFactory.createForClass(TeacherSpace);
