import { IQuery } from '@nestjs/cqrs';

export class FindSpaceQuery implements IQuery {
  constructor(public readonly id: string) {}
}
