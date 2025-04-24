import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTeacherSpaceCommand } from './create-teacher-space.command';

@CommandHandler(CreateTeacherSpaceCommand)
export class CreateTeacherSpaceHandler
  implements ICommandHandler<CreateTeacherSpaceCommand, void>
{
  execute(command: CreateTeacherSpaceCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
