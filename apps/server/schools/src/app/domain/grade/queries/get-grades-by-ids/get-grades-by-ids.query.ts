import { IQuery } from "@nestjs/cqrs";

export class GetGradesByIdsQuery implements IQuery {
  constructor(public readonly ids: string[]) {}
}