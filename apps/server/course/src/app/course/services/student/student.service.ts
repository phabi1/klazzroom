import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStudentInput } from '../../dto/create-student.input';
import { Course } from '../../entities/course.entity';
import { Student } from '../../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(@InjectModel('course') private readonly model: Model<Course>) {}

  async create(createStudentInput: CreateStudentInput) {
    const course = await this.model.findById(createStudentInput.course);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const student = new Student();
    student._id = new Types.ObjectId();
    student.firstname = createStudentInput.firstname;
    student.lastname = createStudentInput.firstname;
    course.students.push(student);

    await course.save();
    
    return student;
  }
}
