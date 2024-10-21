import { Field, ObjectType } from "@nestjs/graphql";
import { Space } from "./space.type";

@ObjectType({
    implements: () => [Space]
})
export class TeacherSpace extends Space {
    @Field()
    courseId: string;
}