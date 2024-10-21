import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { SpaceOpenedEvent } from '../events/space-opened.event';
import { SpaceClosedEvent } from '../events/space-closed.event';
import { IEvent } from '@nestjs/cqrs';

export interface ISpace {
  readonly id: string;
  kind: string;
  title: string;
  userId: string;
}

export interface ISpaceMethods {
  apply(event: IEvent): void;
  commit(): void;
  open(): void;
  close(): void;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'kind',
})
export class SpaceEntity implements ISpace {
  id: string;
  kind: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  userId: string;
}

export type SpaceDocument = HydratedDocument<ISpace, ISpaceMethods>;

export const SpaceSchema = SchemaFactory.createForClass(SpaceEntity);

SpaceSchema.method({
  open: function () {
    this.apply(new SpaceOpenedEvent(this.id, this.kind));
  },
  close: function () {
    this.apply(new SpaceClosedEvent(this.id, this.kind));
  }
});

export type SpaceModel = Model<ISpace, SpaceDocument, ISpaceMethods>;
