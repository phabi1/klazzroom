import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeModule } from '../grade/grade.module';
import { CourseController } from './controllers/course/course.controller';
import { CourseSchema } from './entities/course.entity';
import { CourseResolver } from './resolvers/course/course.resolver';
import { StudentResolver } from './resolvers/student/student.resolver';
import { CourseService } from './services/course/course.service';
import { StudentService } from './services/student/student.service';
import { ContactResolver } from './resolvers/contact/contact.resolver';
import { ContactService } from './services/contact/contact.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    GradeModule,
  ],
  providers: [
    CourseResolver,
    CourseService,
    StudentResolver,
    StudentService,
    ContactResolver,
    ContactService,
  ],
  controllers: [CourseController],
})
export class CourseModule {}
