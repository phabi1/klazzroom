import { IEvent } from '@nestjs/cqrs';

export class SpaceOpenedEvent implements IEvent {
  constructor(public readonly id: string, public readonly kind: string) {}
}