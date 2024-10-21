import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { AdministratorSpaceDocument, AdministratorSpaceEntity } from '../entities/administrator-space.entity';
import { SpaceEntity, SpaceModel } from '../entities/space.entity';
import { CreateAdministratorSpaceCommand } from './create-administrator-space-command';
import { SpaceOpenedEvent } from '../events/space-opened.event';

@CommandHandler(CreateAdministratorSpaceCommand)
export class CreateAdministratorSpaceHandler
  implements
    ICommandHandler<CreateAdministratorSpaceCommand, AdministratorSpaceEntity>
{
  constructor(
    @InjectModel(SpaceEntity.name) private readonly model: SpaceModel,
    private readonly eventBus: EventBus
  ) {}

  async execute(
    command: CreateAdministratorSpaceCommand
  ): Promise<AdministratorSpaceEntity> {
    const subModel = this.model.discriminators['administrator'];

    const entity: AdministratorSpaceDocument = new subModel();
    entity.title = 'Administration';
    entity.userId = command.userId;
    entity.open();

    await entity.save();
    this.eventBus.publish(new SpaceOpenedEvent(entity.id, entity.kind));

    return entity;
  }
}
