import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStudentInput } from '../../dto/create-student.input';
import { Course } from '../../entities/course.entity';
import { Student } from '../../entities/student.entity';
import { UpdateStudentInput } from '../../dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Course') private readonly model: Model<Course>) {}

  async create(input: CreateStudentInput) {
    const course = await this.model.findById(input.course);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const student = new Student();
    student._id = new Types.ObjectId();

    Object.keys(input).forEach((key) => {
      let value = input[key];
      if (key === 'grade') {
        value = new Types.ObjectId(value);
      }
      student[key] = value;
    });
    
    course.students.push(student);

    await course.save();

    return course.students[course.students.length - 1];
  }

  async update(id: string, input: UpdateStudentInput) {
    const course = await this.model.findOne({
      'students._id': new Types.ObjectId(id),
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const student = course.students.find(
      (student) => student._id.toString() === id
    );

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    Object.keys(input).forEach((key) => {
      let value = input[key];
      if (key === 'grade') {
        value = new Types.ObjectId(value);
      }
      student[key] = value;
    });

    await course.save();

    return student;
  }
}
