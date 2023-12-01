import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStudentInput {
    @Field({description: 'Firstname'})
    firstname: string;

    @Field({description: 'Lastname'})
    lastname: string;

    @Field({description: 'Course ID'})
    course: string;
}