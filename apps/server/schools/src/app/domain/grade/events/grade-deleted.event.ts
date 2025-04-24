import { IEvent } from '@nestjs/cqrs';

export class GradeDeletedEvent implements IEvent {
  static readonly type = '[Grade] Deleted';

  constructor(public readonly id: string) {}
}
