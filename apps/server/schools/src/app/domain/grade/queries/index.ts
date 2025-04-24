import { Type } from "@nestjs/common";
import { IQueryHandler } from "@nestjs/cqrs";
import { GetGradesByIdsHandler } from "./get-grades-by-ids/get-grades-by-ids.handler";
import { GetGradesHandler } from "./get-grades/get-grades.handler";

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
    GetGradesHandler,
    GetGradesByIdsHandler,
];