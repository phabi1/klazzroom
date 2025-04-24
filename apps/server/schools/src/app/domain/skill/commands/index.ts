import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreateSkillHandler } from './create-skill/create-skill.handler';
import { DeleteSkillHandler } from './delete-skill/delete-skill.handler';
import { UpdateSkillHandler } from './update-skill/update-skill.handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateSkillHandler,
  UpdateSkillHandler,
  DeleteSkillHandler
];
