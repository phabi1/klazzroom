import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSkillCommand } from '../commands/create-skill/create-skill.command';
import { DeleteSkillCommand } from '../commands/delete-skill/delete-skill.command';
import { UpdateSkillCommand } from '../commands/update-skill/update-skill.command';
import { GetSkillsQuery } from '../queries/get-skills/get-skills.query';

@Injectable()
export class SkillService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async items() {
    return this.queryBus.execute(new GetSkillsQuery());
  }

  async create(data: any) {
    return this.commandBus.execute(new CreateSkillCommand(data));
  }

  async update(id: string, data: any) {
    return this.commandBus.execute(new UpdateSkillCommand(id, data));
  }

  async delete(id: string, parent?: string) {
    return this.commandBus.execute(new DeleteSkillCommand(id, parent));
  }
}
