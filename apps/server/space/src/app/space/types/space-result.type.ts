import { createUnionType } from '@nestjs/graphql';
import { TeacherSpace } from '../entities/teacher-space.entity';

export const SpaceResult = createUnionType({
  name: 'SpaceResult',
  types: () => [TeacherSpace],
  resolveType(value) {
    if (value.kind === 'TeacherSpace') {
      return TeacherSpace;
    }
    return null;
  },
});
