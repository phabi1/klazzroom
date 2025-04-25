import { Dataloader } from '@klazzroom/libs-server-graphql-subgraph-dataloaders';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { CourseService } from '../../../../domain/course/services/course/course.service';
import { Course } from '../../types/course.type';
import { Grade } from '../../types/grade.type';
import { Student } from '../../types/student.type';
import { UpdateCourseInput } from '../../inputs/update-course.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Query(() => Course)
  async course(@Args('id', { type: () => ID }) id: string) {
    const course = await this.courseService.item(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  @Mutation(() => Course)
  async updateCourse(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCourseInput
  ) {
    return this.courseService.update(id, input);
  }

  @ResolveField('student', () => Student, { nullable: true })
  async student(
    @Parent() course: any,
    @Args('id', { type: () => ID }) id: string
  ) {
    return course.students.find((student: any) => student.id === id);
  }

  @ResolveField('grades', () => [Grade])
  async grades(
    @Parent() course: { gradeIds: any[] },
    @Dataloader('grade') loader: DataLoader<string, Grade>
  ) {
    return loader.loadMany(course.gradeIds.map((id: any) => id.toString()));
  }
}
