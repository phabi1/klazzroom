import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({discriminatorKey: 'kind' })
export class Space {
  @Field(() => ID, { description: 'Space ID' })
  id: string;

  @Field(() => String, { description: 'Space title' })
  @Prop()
  title: string;

  @Field(() => String, { description: 'User ID' })
  @Prop({ required: true })
  user: string;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);