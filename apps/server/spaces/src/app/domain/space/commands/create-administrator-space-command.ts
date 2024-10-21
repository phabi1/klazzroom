import { ICommand } from "@nestjs/cqrs";

export class CreateAdministratorSpaceCommand implements ICommand {
    constructor (public readonly userId: string) {}
}