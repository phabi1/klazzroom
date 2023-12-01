import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from '../entities/space.entity';
import { CreateTeacherSpaceInput } from '../inputs/create-teacher-space.input';
import { UpdateTeacherSpaceInput } from '../inputs/update-teacher-space.input';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SpaceService {
  constructor(
    @Inject('course') private readonly client: ClientProxy,
    @InjectModel('Space') private readonly model: Model<Space>
  ) {}

  async createTeacher(
    data: CreateTeacherSpaceInput,
    user: string
  ): Promise<Space> {
    const course = await lastValueFrom(this.client.send('createCourse', {}));
    console.log(course);

    const entity = new this.model.discriminators['TeacherSpace'](data);
    entity.user = user;
    entity.course = course.id;
    await entity.save();
    return entity;
  }

  async findByUser(uid: string): Promise<Space[]> {
    return this.model.find({ user: uid }).exec();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, data: UpdateTeacherSpaceInput) {
    return `This action updates a #${id} space`;
  }

  remove(id: string) {
    return `This action removes a #${id} space`;
  }
}
