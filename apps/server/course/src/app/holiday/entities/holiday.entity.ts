import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Holiday {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  startAt: Date;

  @Field()
  @Prop({ required: true })
  endAt: Date;

  @Field(() => [String])
  @Prop({ required: true, default: [] })
  tags: string[];
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);
