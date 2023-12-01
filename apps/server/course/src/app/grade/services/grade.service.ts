import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGradeInput } from '../dto/create-grade.input';
import { UpdateGradeInput } from '../dto/update-grade.input';
import { Grade } from '../entities/grade.entity';
import { CourseNotFoundException } from '../../course/exceptions/course-not-found.exception';

@Injectable()
export class GradeService {
  constructor(@InjectModel('grade') private readonly model: Model<Grade>) {}

  create(createGradeInput: CreateGradeInput): Promise<Grade> {
    const entity = new this.model(createGradeInput);
    return entity.save();
  }

  findAll(): Promise<Grade[]> {
    return this.model.find().exec();
  }

  findOne(id: string): Promise<Grade> {
    return this.model.findById(id).exec();
  }

  update(id: string, updateGradeInput: UpdateGradeInput): Promise<Grade> {
    return this.model.findByIdAndUpdate(id, updateGradeInput).exec();
  }

  async remove(id: string): Promise<Grade> {
    const course = await this.model.findById(id);
    
    if (!course) {
      throw CourseNotFoundException.withId(id);
    }

    await course.deleteOne();
    
    return course;
  }
}
