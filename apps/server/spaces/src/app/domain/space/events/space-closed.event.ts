import { IEvent } from '@nestjs/cqrs';

export class SpaceClosedEvent implements IEvent {
  constructor(public readonly id: string, public readonly kind: string) {}
}
