import { IConsumer } from '@klazzroom/libs-api-gateway-core';
import { Schema, SchemaTypes } from 'mongoose';

export const ConsumerSchema = new Schema<IConsumer>({
  email: {
    type: SchemaTypes.String,
  },
});
