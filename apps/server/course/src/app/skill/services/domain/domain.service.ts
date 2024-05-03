import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainDto } from '../../dto/create-domain.dto';
import { UpdateDomainDto } from '../../dto/update-domain.dto';
import { Domain, DomainDocument } from '../../entities/domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(Domain.name) private readonly model: Model<DomainDocument>
  ) {}

  findAll(): Promise<Domain[]> {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  create(data: CreateDomainDto): Promise<Domain> {
    const entity = new this.model(data);
    return entity.save();
  }

  async update(id: string, data: UpdateDomainDto): Promise<Domain> {
    const entity = await this.model.findById(id);
    Object.keys(data).forEach((key) => {
      entity.set(key, data[key]);
    });
    return entity.save();
  }

  async remove(id: string): Promise<Domain> {
    const entity = await this.model.findById(id).exec();
    await entity.deleteOne();
    return entity;
  }
}
