import { IEvent } from "@nestjs/cqrs";

export class CourseDeletedEvent implements IEvent {
  constructor(
    public readonly courseId: string,
  ) {}
}