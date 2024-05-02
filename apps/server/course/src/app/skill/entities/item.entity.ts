import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Domain } from "./domain.entity";

@ObjectType('SkillItem')
@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Item {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({ required: true })
    title: string;

    @Field()
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    domain: Types.ObjectId | Domain;
}

export const ItemSchema = SchemaFactory.createForClass(Item);