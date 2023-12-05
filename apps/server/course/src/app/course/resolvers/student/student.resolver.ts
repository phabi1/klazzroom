import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Grade } from '../../../grade/entities/grade.entity';
import { GradeService } from '../../../grade/services/grade.service';
import { CreateStudentInput } from '../../dto/create-student.input';
import { Student } from '../../entities/student.entity';
import { StudentService } from '../../services/student/student.service';
import { UpdateStudentInput } from '../../dto/update-student.input';

@Resolver(Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly gradeService: GradeService
  ) {}

  @Mutation(() => Student)
  createStudent(@Args('input') input: CreateStudentInput) {
    return this.studentService.create(input);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStudentInput
  ) {
    return this.studentService.update(id, input);
  }

  @ResolveField(() => Grade)
  grade(@Parent() student: Student) {
    return this.gradeService.findOne(student.grade.toString());
  }
}
