import { AggregatorModelMethods } from '@klazzroom/libs-server-mongoose-cqrs';
import { Model } from 'mongoose';

export interface Space {
  readonly id: string;
  title: string;
  userId: string;
  readonly kind: string;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type SpaceMethods = {
  open(): void;
  close(): void;
} & AggregatorModelMethods;

export type SpaceModel = Model<Space, Record<string, unknown>, SpaceMethods>;

export const SpaceSchemaName = 'Space';
