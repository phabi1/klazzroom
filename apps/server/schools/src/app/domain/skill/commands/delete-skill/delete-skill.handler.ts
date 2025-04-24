import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, type SkillModel } from '../../models/skill.model';
import { SkillSchemaName } from '../../schemas/skill.schema';
import { DeleteSkillCommand } from './delete-skill.command';
import { Document, Types } from 'mongoose';

@CommandHandler(DeleteSkillCommand)
export class DeleteSkillHandler
  implements ICommandHandler<DeleteSkillCommand, Skill>
{
  constructor(
    @InjectModel(SkillSchemaName) private readonly model: SkillModel
  ) {}

  async execute(command: DeleteSkillCommand): Promise<Skill> {
    const { id, parent } = command;
    const skill = await this.model.findById(id);
    if (!skill) {
      throw new Error(`Skill with id ${id} not found`);
    }
    // Update the skill with the provided data
    if (parent) {
      const children = await this.model.find({ parent: id });
      if (children.length > 0) {
        await this.reassignChildren(children, parent);
      }
    }
    await skill.save();
    return skill;
  }

  private async reassignChildren(
    children: (Document<unknown, {}, Skill> &
      Skill & { _id: Types.ObjectId } & { __v: number })[],
    parent: string
  ) {
    for (const child of children) {
      child.parent = parent;
      await child.save();
    }
  }
}
