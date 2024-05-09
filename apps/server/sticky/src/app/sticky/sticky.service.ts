import { Injectable } from '@nestjs/common';
import { CreateStickyInput } from './dto/create-sticky.input';
import { UpdateStickyInput } from './dto/update-sticky.input';
import { InjectModel } from '@nestjs/mongoose';
import { Sticky } from './entities/sticky.entity';
import { Model } from 'mongoose';

@Injectable()
export class StickyService {
constructor(@InjectModel(Sticky.name) private readonly model: Model<Sticky>) {}

  findByTags(tags: string[]) {
    return this.model.find({ tags: { $in: tags } });
  }
  create(createStickyInput: CreateStickyInput) {
    const entity = new this.model(createStickyInput);
    return entity.save();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, updateStickyInput: UpdateStickyInput) {
    const entity = this.model.findByIdAndUpdate(id, updateStickyInput, { new: true });
    return entity;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id, { new: true});
  }
}
