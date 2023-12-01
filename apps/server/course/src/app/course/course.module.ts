import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './controllers/course/course.controller';
import { CourseSchema } from './entities/course.entity';
import { CourseResolver } from './resolvers/course/course.resolver';
import { CourseService } from './services/course/course.service';
import { StudentResolver } from './resolvers/student/student.resolver';
import { StudentService } from './services/student/student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'course', schema: CourseSchema }]),
  ],
  providers: [CourseResolver, CourseService, StudentResolver, StudentService],
  controllers: [CourseController],
})
export class CourseModule {}
