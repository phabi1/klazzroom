import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class TimetableEvent {
    @Field(() => ID, {description: 'Event ID'})
    id?: string;

    @Field(() => String, {description: 'Event title'})
    @Prop()
    title: string;

    @Field(() => String, {description: 'Type of event'})
    @Prop()
    type: string;

    @Field({description: 'Start date of event'})
    @Prop()
    start: Date;

    @Field({description: 'End date of event'})
    @Prop()
    end: Date;
}

export const TimetableEventSchema = SchemaFactory.createForClass(TimetableEvent);