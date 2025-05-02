import { IQuery } from '@nestjs/cqrs';

export class GetTimetableQuery implements IQuery {
  constructor(public readonly id: string) {}
}
