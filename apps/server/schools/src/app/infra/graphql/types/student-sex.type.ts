import { registerEnumType } from '@nestjs/graphql';
import { StudentSex } from '../../../domain/course/models/student-sex.model';

registerEnumType(StudentSex, {
  name: 'StudentSex',
});
