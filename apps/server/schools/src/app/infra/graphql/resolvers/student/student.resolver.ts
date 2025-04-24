import { Dataloader } from '@klazzroom/libs-server-graphql-subgraph-dataloaders';
import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { StudentService } from '../../../../domain/course/services/student/student.service';
import { CreateStudentInput } from '../../inputs/create-student.input';
import { UpdateStudentInput } from '../../inputs/update-student.input';
import { Grade } from '../../types/grade.type';
import { Student } from '../../types/student.type';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async createStudent(
    @Args('courseId', { type: () => ID }) courseId: string,
    @Args('input') data: CreateStudentInput
  ): Promise<string> {
    return this.studentService.create(data, courseId);
  }
  @Mutation(() => Student)
  async updateStudent(
    @Args('id', { type: () => ID }) studentId: string,
    @Args('input') data: UpdateStudentInput
  ): Promise<string> {
    return this.studentService.update(studentId, data);
  }
  @Mutation(() => Student)
  async deleteStudent(
    @Args('id', { type: () => ID }) studentId: string,
    @Args('courseId', { type: () => ID }) courseId: string
  ): Promise<string> {
    return this.studentService.delete(studentId, courseId);
  }

  @ResolveField(() => Grade, { nullable: true })
  async grade(
    @Parent() student: { gradeId: any },
    @Dataloader('grade') loader: DataLoader<string, Grade>
  ) {
    return loader.load(student.gradeId.toString());
  }
}
