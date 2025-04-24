import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Skill, type SkillModel } from "../../models/skill.model";
import { SkillSchemaName } from "../../schemas/skill.schema";
import { UpdateSkillCommand } from "./update-skill.command";

@CommandHandler(UpdateSkillCommand)
export class UpdateSkillHandler implements ICommandHandler<UpdateSkillCommand, Skill> {
    constructor(
        @InjectModel(SkillSchemaName) private readonly model: SkillModel
    ) {}
    
    async execute(command: UpdateSkillCommand): Promise<Skill> {
        const { id, data } = command;
        const skill = await this.model.findById(id);
        if (!skill) {
            throw new Error(`Skill with id ${id} not found`);
        }
        // Update the skill with the provided data
        if (data.title) {
            skill.title = data.title;
        }
        if (data.parent) {
            skill.parent = data.parent;
        }
        if (data.color) {
            skill.color = data.color;
        }
        if (data.weight) {
            skill.weight = data.weight;
        }
        return skill.save();
    }
}