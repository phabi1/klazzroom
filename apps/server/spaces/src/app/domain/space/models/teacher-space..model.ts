import { Model } from "mongoose";
import { Space, SpaceMethods } from "./space.base";

export interface TeacherSpace extends Space {
  kind: 'teacher';
  courseId: string;
}

export type TeacherSpaceModel = Model<TeacherSpace, Record<string, unknown>, SpaceMethods>;