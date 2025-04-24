import { Model } from "mongoose";
import { Space, SpaceMethods } from "./space.base";

export interface AdministratorSpace extends Space {
  kind: 'administrator';
}

export type AdministratorSpaceModel = Model<AdministratorSpace, Record<string, unknown>, SpaceMethods>;