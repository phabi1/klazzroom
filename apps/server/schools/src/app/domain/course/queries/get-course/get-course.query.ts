import { IQuery } from "@nestjs/cqrs";

export class GetCourseQuery implements IQuery {
  constructor(public readonly id: string) {}
}