import { IQuery } from '@nestjs/cqrs';

export class GetTimetablesByTagsQuery implements IQuery {
  constructor(public readonly tags: string[]) {}
}
