import { Logger } from '@nestjs/common';
import { createUnionType } from '@nestjs/graphql';
import { AdministratorSpace } from './space/administrator-space.type';
import { TeacherSpace } from './space/teacher-space.type';

export const Space = createUnionType({
  name: 'Space',
  types: () => [AdministratorSpace, TeacherSpace],
  resolveType(value) {
    Logger.debug('Resolving space type', value);
    switch (value.kind) {
      case 'administrator':
        return AdministratorSpace;
      case 'teacher':
        return TeacherSpace;
      default:
        return null;
    }
  },
});

export type Spaces = AdministratorSpace | TeacherSpace;
