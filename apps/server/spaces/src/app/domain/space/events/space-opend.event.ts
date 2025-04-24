import { IEvent } from "@nestjs/cqrs";

export class SpaceOpenedEvent implements IEvent {
  static readonly type = '[Space] Opened';

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly kind: string,
  ) {}
}