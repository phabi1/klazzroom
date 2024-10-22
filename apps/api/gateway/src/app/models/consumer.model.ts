import { IConsumer } from '@klazzroom/libs-api-gateway-core';
import { Schema, SchemaTypes } from 'mongoose';

export const ConsumerSchema = new Schema<IConsumer>({
  email: {
    type: SchemaTypes.String,
  },
  providers: {
    type: SchemaTypes.Mixed,
  },
});

ConsumerSchema.static(
  'findByProvider',
  function (provider: string, value: string) {
    return this.findOne({ ['providers.' + provider]: value });
  }
);
