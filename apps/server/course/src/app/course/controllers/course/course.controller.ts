import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CourseService } from '../../services/course/course.service';

@Controller()
export class CourseController {
  constructor(private courseService: CourseService) {}

  @MessagePattern('createCourse')
  createCourse(@Payload() payload) {
    return this.courseService.create(payload);
  }
}
