import { IEvent } from '@nestjs/cqrs';

export class GradeUpdatedEvent implements IEvent {
  static readonly type = '[Grade] Updated';

  constructor(public readonly id: string) {}
}
