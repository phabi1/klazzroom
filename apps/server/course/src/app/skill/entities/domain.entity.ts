import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType('SkillDomain')
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Domain {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  color: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);