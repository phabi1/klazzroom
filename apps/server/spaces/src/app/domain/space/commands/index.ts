import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministratorSpaceHandler } from './create-administrator-space/create-administrator-space.handler';
import { CreateTeacherSpaceHandler } from './create-teacher-space/create-teacher-space.handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateAdministratorSpaceHandler,
  CreateTeacherSpaceHandler,
];
