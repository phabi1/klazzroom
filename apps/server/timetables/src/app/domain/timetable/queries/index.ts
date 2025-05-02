import { Type } from "@nestjs/common";
import { IQueryHandler } from "@nestjs/cqrs";
import { GetTimetableHandler } from "./get-timetable/get-timetable.handler";
import { GetTimetablesByTagsHandler } from "./get-timetables-by-tags/get-timetables-by-tags.handler";

export const QUERY_HANDLERS: Type<IQueryHandler>[] = [
    GetTimetablesByTagsHandler,
    GetTimetableHandler
];