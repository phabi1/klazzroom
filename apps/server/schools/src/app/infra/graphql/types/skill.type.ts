import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Skill {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    title!: string;

    @Field(() => String, { nullable: true })
    parent?: string;

    @Field(() => String, { nullable: true })
    color?: string;

    @Field(() => Number, { nullable: true })
    weight?: number;
}