import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindSpacesByUserHandler } from './find-spaces-by-user/find-spaces-by-user.handler';
import { FindSpaceHandler } from './find-space/find-space.handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
  FindSpacesByUserHandler,
  FindSpaceHandler,
];
