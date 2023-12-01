import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Grade {
  @Field(() => ID, { description: 'Grade ID' })
  id: string;

  @Field({description: 'Title of grade'})
  @Prop()
  title: string;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);