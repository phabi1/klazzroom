import { ICommand } from '@nestjs/cqrs';
import { StudentSex } from '../../models/student-sex.model';

export class AddStudentToCourseCommand implements ICommand {
  constructor(
    public readonly data: {
      firstname: string;
      lastname: string;
      gradeId: string;
      birthday: Date | null;
      avatarUrl: string;
      sex: StudentSex;
    },
    public readonly courseId: string
  ) {}
}
