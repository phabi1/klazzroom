import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Domain, DomainSchema } from './entities/domain.entity';
import { Item, ItemSchema } from './entities/item.entity';
import { SkillResolver } from './resolvers/skill.resolver';
import { DomainService } from './services/domain/domain.service';
import { ItemService } from './services/item/item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema, collection: 'skill_domains' },
      { name: Item.name, schema: ItemSchema, collection: 'skill_items' },
    ]),
  ],
  providers: [SkillResolver, DomainService, ItemService],
})
export class SkillModule {}
