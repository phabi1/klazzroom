import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true, toJSON: { virtuals: true }, id: false })
export class Sticky {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  data: string;

  @Field(() => [String], { nullable: 'items'})
  @Prop({ default: [] })
  tags: string[];
}
