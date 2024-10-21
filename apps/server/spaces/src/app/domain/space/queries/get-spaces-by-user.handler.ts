import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { SpaceEntity, SpaceModel } from "../entities/space.entity";
import { GetSpacesByUserQuery } from "./get-spaces-by-user.query";

@QueryHandler(GetSpacesByUserQuery)
export class GetSpacesByUserHandler implements IQueryHandler<GetSpacesByUserQuery, SpaceEntity[]> {
    constructor(@InjectModel(SpaceEntity.name) private readonly model: SpaceModel) {}
    execute(query: GetSpacesByUserQuery): Promise<SpaceEntity[]> {
        return this.model.find({
            userId: query.id
        })
    }
}