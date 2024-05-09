import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimetableEvent, TimetableEventSchema } from './timetable-event.entity';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Timetable {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String, { description: 'Timetable title' })
  @Prop({ required: true })
  title: string;

  @Field(() => [TimetableEvent], { description: 'Events of timetable' })
  @Prop({ type: [TimetableEventSchema] })
  events: TimetableEvent[];

  @Field(() => [String])
  @Prop({ default: [] })
  tags: string[];
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);
