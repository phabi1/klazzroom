import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class TeacherSpaceEntity {
    @Prop({required: true})
    courseId: string;
}

export const TeacherSpaceSchema = SchemaFactory.createForClass(TeacherSpaceEntity);