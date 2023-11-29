import { Injectable } from '@nestjs/common';
import { CreateTeacherSpaceInput } from './inputs/create-teacher-space.input';
import { UpdateTeacherSpaceInput } from './inputs/update-teacher-space.input';

@Injectable()
export class SpaceService {
  create(data: CreateTeacherSpaceInput) {
    return 'This action adds a new space';
  }

  findAll() {
    return `This action returns all space`;
  }

  findOne(id: string) {
    return `This action returns a #${id} space`;
  }

  update(id: string, data: UpdateTeacherSpaceInput) {
    return `This action updates a #${id} space`;
  }

  remove(id: string) {
    return `This action removes a #${id} space`;
  }
}
