import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Contact {
  @Field()
  @Prop()
  type: string;

  @Field()
  @Prop()
  value: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
