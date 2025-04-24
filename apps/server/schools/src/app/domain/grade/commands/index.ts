import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateGradeHandler } from './create-grade/create-grade.handler';
import { UpdateGradeHandler } from './update-grade/update-grade.handler';
import { DeleteGradeHandler } from './delete-grade/delete-grade.handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateGradeHandler,
  UpdateGradeHandler,
  DeleteGradeHandler
];
