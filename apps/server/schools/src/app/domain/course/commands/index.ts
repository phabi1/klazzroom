import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { AddStudentToCourseHandler } from './add-student-to-course/add-student-to-course.handler';
import { CreateCourseHandler } from './create-course/create-course.handler';
import { DeleteCourseHandler } from './delete-course/delete-course.handler';
import { RemoveStudentFromCourseHandler } from './remove-student-from-course/remove-student-from-course.handler';
import { UpdateStudentHandler } from './update-student/update-student.handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateCourseHandler,
  DeleteCourseHandler,
  AddStudentToCourseHandler,
  UpdateStudentHandler,
  RemoveStudentFromCourseHandler
];
