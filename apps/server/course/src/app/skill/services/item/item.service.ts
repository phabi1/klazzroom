import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateItemDto } from '../../dto/create-item.dto';
import { UpdateItemDto } from '../../dto/update-item.dto';
import { Item } from '../../entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly model: Model<Item>) {}

  getItemsByDomain(domainId: string) {
    return this.model.find({ domain: new Types.ObjectId(domainId) });
  }

  create(data: CreateItemDto) {
    const entity = new this.model(data);
    return entity.save();
  }

  async update(id: string, data: UpdateItemDto) {
    const entity = await this.model.findById(id);
    Object.keys(data).forEach((key) => {
      entity.set(key, data[key]);
    });
    return entity.save();
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
