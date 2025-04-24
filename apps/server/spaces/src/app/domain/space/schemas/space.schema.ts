import { Schema } from 'mongoose';
import { SpaceClosedEvent } from '../events/space-closed.events';
import { SpaceOpenedEvent } from '../events/space-opend.event';
import { SpaceModel } from '../models/space.base';



export const SpaceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'spaces',
    timestamps: true,
    versionKey: false,
    discriminatorKey: 'kind',
  }
);

SpaceSchema.index({ userId: 1 });

SpaceSchema.method<any>('open', function () {
  if (this.active) {
    return;
  }
  this.active = true;
  this.apply(new SpaceOpenedEvent(this.id, this.userId, this.kind), 'prepend');
});

SpaceSchema.method<any>('close', function () {
  if (!this.active) {
    return;
  }
  this.active = false;
  this.apply(
    new SpaceClosedEvent(this.id, this.userId, this.kind),
    
  );
});
