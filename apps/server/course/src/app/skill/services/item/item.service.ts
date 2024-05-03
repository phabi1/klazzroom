import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateItemDto } from '../../dto/create-item.dto';
import { UpdateItemDto } from '../../dto/update-item.dto';
import { Item } from '../../entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private readonly model: Model<Item>) {}

  findByDomain(domain: string): Promise<Item[]> {
    return this.model.find({ domain: new Types.ObjectId(domain) });
  }

  findById(id: string): Promise<Item> {
    return this.model.findById(id);
  }

  create(data: CreateItemDto): Promise<Item> {
    const entity = new this.model(data);
    return entity.save();
  }

  async update(id: string, data: UpdateItemDto): Promise<Item> {
    const entity = await this.model.findById(id);
    Object.keys(data).forEach((key) => {
      entity.set(key, data[key]);
    });
    return entity.save();
  }

  async remove(id: string): Promise<Item> {
    const item = await this.model.findById(id).exec();
    await item.deleteOne();
    return item;
  }
}
