import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Space } from "./space.type";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Me {
    @Field(() => ID)
    @Directive('@external')
    id: string;

    @Field(() => [Space])
    spaces: any[];
}