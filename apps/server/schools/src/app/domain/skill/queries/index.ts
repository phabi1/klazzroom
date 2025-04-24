import { Type } from "@nestjs/common";
import { IQueryHandler } from "@nestjs/cqrs";
import { GetSkillsHandler } from "./get-skills/get-skills.handler";

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
    GetSkillsHandler
];