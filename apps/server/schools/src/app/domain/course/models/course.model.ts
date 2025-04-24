import { Model } from "mongoose";
import { Grade } from "./grade.model";
import { Student } from "./student.model";

export interface Course {
    readonly id: string;
    grades: Grade[];
    students: Student[];
}; 

export type CourseModel = Model<Course>;