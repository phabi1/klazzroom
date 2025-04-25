import { IEvent } from '@nestjs/cqrs';

export class CourseCreatedEvent implements IEvent {
  constructor(public readonly courseId: string) {}
}
