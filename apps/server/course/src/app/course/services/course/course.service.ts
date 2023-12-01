import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseInput } from '../../dto/create-course.input';
import { UpdateCourseInput } from '../../dto/update-course.input';
import { Course } from '../../entities/course.entity';
import { CourseNotFoundException } from '../../exceptions/course-not-found.exception';

@Injectable()
export class CourseService {
  constructor(@InjectModel('course') private readonly model: Model<Course>) {}

  async create(createCourseInput: CreateCourseInput) {
    const entity = new this.model(createCourseInput);
    await entity.save();
    return entity;
  }

  findAll() {
    return `This action returns all course`;
  }

  async findOne(id: string) {
    const course = await this.model.findById(id);
    if (!course) {
      throw CourseNotFoundException.withId(id);
    }
    return course;
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
