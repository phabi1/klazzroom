import { Field, ID, InputType } from "@nestjs/graphql";
import { Sex } from "../enums/sex.enum";

@InputType()
export class CreateStudentInput {
    @Field({description: 'Firstname of student'})
    firstname: string;

    @Field({description: 'Lastname of student'})
    lastname: string;

    @Field(() => ID, {description: 'Grade of student'})
    grade: string;

    @Field({description: 'Birthday of student', nullable: true})
    birthday: Date | null;

    @Field(() => Sex, {description: 'Sex of student'})
    sex: Sex;

    @Field({description: 'Comments', nullable: true})
    comments: string;

    @Field({description: 'Course ID'})
    course: string;
}