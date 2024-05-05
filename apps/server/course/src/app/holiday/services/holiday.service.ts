import { Injectable } from '@nestjs/common';
import { CreateHolidayInput } from '../dto/create-holiday.input';
import { UpdateHolidayInput } from '../dto/update-holiday.input';
import { InjectModel } from '@nestjs/mongoose';
import { Holiday } from '../entities/holiday.entity';
import { Model } from 'mongoose';

@Injectable()
export class HolidayService {

  constructor(
    @InjectModel(Holiday.name) private readonly holidayModel: Model<Holiday>
  ) {}

  create(createHolidayInput: CreateHolidayInput) {
    const entity = new this.holidayModel(createHolidayInput);
    return entity.save();
  }

  findAll() {
    return this.holidayModel.find().exec();
  }

  findByTags(tags: string[]) {
    return this.holidayModel.find({ tags: { $in: tags } }).exec();
  }

  findOne(id: string) {
    return this.holidayModel.findById(id).exec();
  }

  async update(id: string, updateHolidayInput: UpdateHolidayInput) {
    const entity = await this.holidayModel.findById(id);
    entity.set(updateHolidayInput);
    return entity.save();
  }

  async remove(id: string) {
    const entity = this.holidayModel.findById(id);
    await entity.deleteOne();
    return entity;
  }
}
