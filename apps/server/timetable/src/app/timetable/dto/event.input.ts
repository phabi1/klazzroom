import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EventInput {
    @Field()
    title: string;

    @Field()
    type: string;

    @Field()
    start: Date;

    @Field()
    end: Date;
}