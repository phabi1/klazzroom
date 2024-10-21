import { Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class Space {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    userId: string;
}