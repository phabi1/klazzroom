import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from './entities/domain.entity';
import { Item, ItemSchema } from './entities/item.entity';
import { DomainService } from './services/domain/domain.service';
import { ItemService } from './services/item/item.service';
import { DomainResolver } from './resolvers/domain/domain.resolver';
import { ItemResolver } from './resolvers/item/item.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema, collection: 'skill_domains' },
      { name: Item.name, schema: ItemSchema, collection: 'skill_items' },
    ]),
  ],
  providers: [DomainService, ItemService, DomainResolver, ItemResolver],
})
export class SkillModule {}
