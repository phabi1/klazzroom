import { IEvent } from "@nestjs/cqrs";

export class SpaceClosedEvent implements IEvent {
  static readonly type = '[Space] Closed';

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly kind: string,
  ) {}
}