import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetCourseHandler } from './get-course/get-course.handler';

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [GetCourseHandler];
