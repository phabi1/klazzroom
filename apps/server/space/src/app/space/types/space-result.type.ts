import { createUnionType } from '@nestjs/graphql';
import { TeacherSpace } from '../entities/teacher-space.entity';
import { AdministratorSpace } from '../entities/administrator-space.entity';

export const SpaceResult = createUnionType({
  name: 'SpaceResult',
  types: () => [TeacherSpace, AdministratorSpace],
  resolveType(value) {
    switch (value.kind) {
      case 'TeacherSpace':
        return TeacherSpace;
      case 'AdministratorSpace':
        return AdministratorSpace;
    }
    return null;
  },
});
