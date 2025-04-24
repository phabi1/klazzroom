import { IEvent } from '@nestjs/cqrs';

export class GradeCreatedEvent implements IEvent {
  static readonly type = '[Grade] Created';

  constructor(public readonly id: string) {}
}
