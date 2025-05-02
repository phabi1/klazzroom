import { CreateTimetableHandler } from "./create-timetable/create-timetable.handler";
import { UpdateTimetableHandler } from "./update-timetable/update-timetable.handler";

export const COMMAND_HANDLERS = [
    CreateTimetableHandler,
    UpdateTimetableHandler
];