import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Skill, type SkillModel } from "../../models/skill.model";
import { SkillSchemaName } from "../../schemas/skill.schema";
import { CreateSkillCommand } from "./create-skill.command";

@CommandHandler(CreateSkillCommand)
export class CreateSkillHandler implements ICommandHandler<CreateSkillCommand, Skill> {
    constructor(
        @InjectModel(SkillSchemaName) private readonly model: SkillModel
    ) {}
    
    async execute(command: CreateSkillCommand): Promise<Skill> {
        const { data } = command;
        const skill = new this.model(data);
        return skill.save();
    }
}