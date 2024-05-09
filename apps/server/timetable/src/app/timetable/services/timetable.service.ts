import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { CreateTimetableInput } from '../dto/create-timetable.input';
import { UpdateTimetableInput } from '../dto/update-timetable.input';
import { Timetable } from '../entities/timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(Timetable.name) private model: Model<Timetable & Document>
  ) {}

  async create(createTimetableInput: CreateTimetableInput) {
    const entity = new this.model(createTimetableInput);
    await entity.save();
    return entity;
  }

  findAll(tags: string[]): Promise<Timetable[]> {
    if (tags.length > 0) {
      return this.model.find({ tags: { $in: tags } }).exec();
    }
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundException('Timetable not found');
    }
    return entity;
  }

  async update(id: string, data: UpdateTimetableInput) {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundException('Timetable not found');
    }

    if (data.title) {
      entity.title = data.title;
    }

    if (data.events) {
      entity.events = data.events;
    }

    await entity.save();

    return entity;
  }

  async remove(id: string) {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundException('Timetable not found');
    }

    await (entity as any).remove();

    return entity;
  }
}
