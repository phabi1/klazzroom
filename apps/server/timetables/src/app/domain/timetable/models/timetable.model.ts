import { Model } from "mongoose";

export interface Timetable {
    id: string;
    title: string;
    events: any[];
    tags: string[];
}

export type TimetableModel = Model<Timetable>;