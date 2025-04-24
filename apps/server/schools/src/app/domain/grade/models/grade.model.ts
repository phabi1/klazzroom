import { type Item } from '@klazzroom/libs-server-graphql-subgraph-dataloaders';
import { AggregatorModelMethods } from '@klazzroom/libs-server-mongoose-cqrs';
import { Model, HydratedDocument } from 'mongoose';

export interface Grade extends Item {
  readonly id: string;
  name: string;
  title: string;
  weight: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type GradeDocument = HydratedDocument<Grade>;

export type GradeMethods = AggregatorModelMethods;

export type GradeModel = Model<
  Grade,
  Record<string, unknown>,
  GradeMethods,
  {},
  GradeDocument
>;
