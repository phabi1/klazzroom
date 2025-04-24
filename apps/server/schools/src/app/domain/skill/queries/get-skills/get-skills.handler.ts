import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSkillsQuery } from "./get-skills.query";
import { Skill, type SkillModel } from "../../models/skill.model";
import { InjectModel } from "@nestjs/mongoose";
import { SkillSchemaName } from "../../schemas/skill.schema";

@QueryHandler(GetSkillsQuery)
export class GetSkillsHandler implements IQueryHandler<GetSkillsQuery, Skill[]> {
    constructor(
        @InjectModel(SkillSchemaName) private readonly model: SkillModel
    ) {}

    async execute(query: GetSkillsQuery): Promise<Skill[]> {
        return this.model.find().exec();
    }
}