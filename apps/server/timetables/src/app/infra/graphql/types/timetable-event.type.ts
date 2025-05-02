import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TimetableEvent {
    @Field(() => ID)
    id: string;
    @Field(() => String)
    title: string;
    @Field(() => Date)
    startAt: Date;
    @Field(() => Date)
    endAt: Date;
    @Field(() => String)
    type: string;
    @Field(() => String, { nullable: true })
    skillId: string;
    @Field(() => [String], { nullable: 'items' })
    grades: string[];
}