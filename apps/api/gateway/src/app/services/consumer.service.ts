import {
  ConsumerNotFoundError,
  IConsumer,
  IConsumerService,
} from '@klazzroom/libs-api-gateway-core';
import mongoose from 'mongoose';

export class ConsumerService implements IConsumerService {
  private model: any;
  constructor() {
    this.model = mongoose.models['Consumer'];
  }

  find(): Promise<IConsumer[]> {
    return this.model.find();
  }
  async findById(id: string): Promise<IConsumer> {
    const item = await this.model.findById(id);
    if (!item) {
      throw ConsumerNotFoundError.withId(id);
    }
    return item;
  }

  async findByProvider(provider: string, value: string): Promise<IConsumer> {
    const item = await this.model.findOne({ ['providers.' + provider]: value });
    if (!item) {
      throw ConsumerNotFoundError.withProvider(provider, value);
    }
    return item;
  }

  async create(data: any): Promise<IConsumer> {
    const item = new this.model();
    item.set(data);
    await item.save();
    return item;
  }
  async update(id: string, data: any): Promise<IConsumer> {
    const item = await this.model.findById(id);
    if (!item) {
      throw ConsumerNotFoundError.withId(id);
    }
    item.set(data);
    await item.save();
    return item;
  }
  async remove(id: string): Promise<void> {
    const item = await this.model.findById(id);
    if (!item) {
      throw ConsumerNotFoundError.withId(id);
    }
    await item.deleteOne();
    return item;
  }
}
