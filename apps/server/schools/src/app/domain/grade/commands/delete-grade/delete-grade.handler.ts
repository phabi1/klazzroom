import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Grade, type GradeModel } from "../../models/grade.model";
import { GradeSchemaName } from "../../schemas/grade.schema";
import { DeleteGradeCommand } from "./delete-grade.command";

@CommandHandler(DeleteGradeCommand)
export class DeleteGradeHandler implements ICommandHandler<DeleteGradeCommand, Grade> {
    constructor(
        @InjectModel(GradeSchemaName) private readonly model: GradeModel
    ) {}

    async execute(command: DeleteGradeCommand): Promise<Grade> {
        const { id } = command;
        const entity = await this.model.findById(id);
        if (!entity) {
            throw new Error(`Grade with id ${id} not found`);
        }
        await entity.deleteOne();
        return entity;
    }
}