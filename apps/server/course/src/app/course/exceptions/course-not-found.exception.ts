import { NotFoundException } from "@nestjs/common";

export class CourseNotFoundException extends NotFoundException {

    static withId(id: string): CourseNotFoundException {
        return new CourseNotFoundException(`Course with id ${id} not found`);
    }
}