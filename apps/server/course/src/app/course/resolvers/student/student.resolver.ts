import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../entities/student.entity';
import { CreateStudentInput } from '../../dto/create-student.input';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('input') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }
}
