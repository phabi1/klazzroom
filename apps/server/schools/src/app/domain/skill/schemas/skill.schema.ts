import { Schema } from "mongoose";

export const SkillSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    }
});

export const SkillSchemaName = "skills";