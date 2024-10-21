import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ISpace, ISpaceMethods, SpaceEntity } from "./space.entity";

export interface IAdministratorSpace extends ISpace {}

@Schema()
export class AdministratorSpaceEntity extends SpaceEntity {
}

export type AdministratorSpaceDocument = HydratedDocument<IAdministratorSpace, ISpaceMethods>;

export const AdministratorSpaceSchema = SchemaFactory.createForClass(AdministratorSpaceEntity);