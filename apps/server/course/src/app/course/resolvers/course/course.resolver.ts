import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CourseService } from '../../services/course/course.service';
import { Course } from '../../entities/course.entity';
import { CreateCourseInput } from '../../dto/create-course.input';
import { UpdateCourseInput } from '../../dto/update-course.input';
import { Grade } from '../../../grade/entities/grade.entity';
import { GradeService } from '../../../grade/services/grade.service';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly gradeService: GradeService
  ) {}

  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput
  ) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'course' })
  findAll() {
    return this.courseService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput
  ) {
    return this.courseService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.remove(id);
  }

  @ResolveField(() => [Grade])
  grades(@Parent() course: Course) {
    return this.gradeService.findByIds(course.grades);
  }
}
