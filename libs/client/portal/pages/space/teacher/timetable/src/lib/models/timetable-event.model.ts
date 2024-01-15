import { CalendarEvent } from 'angular-calendar';

export type TimetableEvent = CalendarEvent<{
    id?: string;
    type:string;
    grades: string[];
}>;