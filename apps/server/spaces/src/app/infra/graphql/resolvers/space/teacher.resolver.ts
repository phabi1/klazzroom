import { Resolver } from '@nestjs/graphql';
import { TeacherSpace } from '../../types/teacher-space.type';

@Resolver(() => TeacherSpace)
export class TeacherResolver {}
