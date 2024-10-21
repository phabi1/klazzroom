import { ObjectType } from "@nestjs/graphql";
import { Space } from "./space.type";

@ObjectType({
    implements: () => [Space]
})
export class AdministratorSpace extends Space {

}