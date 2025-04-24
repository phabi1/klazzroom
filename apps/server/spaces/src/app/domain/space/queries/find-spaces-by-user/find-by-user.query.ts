import { IQuery } from "@nestjs/cqrs";

export class FindSpacesByUserQuery implements IQuery {
  constructor(public readonly userId: string) {}
}