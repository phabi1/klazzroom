import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Space } from './space.entity';

@ObjectType()
@Schema()
export class AdministratorSpace extends Space {}

export const TeacherSpaceSchema = SchemaFactory.createForClass(AdministratorSpace);
