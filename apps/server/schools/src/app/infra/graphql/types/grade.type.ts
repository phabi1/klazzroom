import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Grade {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    title!: string;

    @Field(() => Int)
    weight!: number;
}