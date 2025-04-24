import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { SpaceAlreadyExistsException } from '../../exceptions/space-alredy-exists.exception';
import {
  AdministratorSpaceModel
} from '../../models/administrator-space.model';
import {
  Space,
  type SpaceModel,
  SpaceSchemaName,
} from '../../models/space.base';
import { AdministratorSpaceSchemaName } from '../../schemas/administrator-space.schema';
import { CreateAdministratorSpaceCommand } from './create-administrator-space.command';

@CommandHandler(CreateAdministratorSpaceCommand)
export class CreateAdministratorSpaceHandler
  implements ICommandHandler<CreateAdministratorSpaceCommand, Space>
{
  private readonly logger: Logger = new Logger(
    CreateAdministratorSpaceHandler.name
  );
  private readonly model: AdministratorSpaceModel;

  constructor(
    @InjectModel(SpaceSchemaName)
    spaceModel: SpaceModel
  ) {
    if (!spaceModel.discriminators) {
      throw new Error('Space model is not provided');
    }
    this.model = spaceModel.discriminators[
      AdministratorSpaceSchemaName
    ] as AdministratorSpaceModel
  }

  async execute(command: CreateAdministratorSpaceCommand): Promise<Space> {
    if (await this.checkIfSpaceExistsForSameUser(command.data.userId)) {
      throw SpaceAlreadyExistsException.withUserId(command.data.userId);
    }

    const space = new this.model(command);
    space.open();
    
    await space.save();

    this.logger.verbose(
      `Administrator space created for user ${command.data.userId}`
    );
    return space;
  }

  private async checkIfSpaceExistsForSameUser(
    userId: string
  ): Promise<boolean> {
    const space = await this.model.exists({
      kind: AdministratorSpaceSchemaName,
      userId: userId,
    });
    return !!space;
  }
}
