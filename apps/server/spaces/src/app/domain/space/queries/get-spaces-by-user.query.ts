import { IQuery } from "@nestjs/cqrs";

export class GetSpacesByUserQuery implements IQuery {
    constructor (public readonly id: string) {}
}