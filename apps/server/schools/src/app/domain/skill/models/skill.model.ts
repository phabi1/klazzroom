import { Model } from "mongoose";

export interface Skill {
    readonly id: string;
    title: string;
    color?: string;
    parent?: string;
    children?: string[];
    weight?: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type SkillModel = Model<Skill>;
