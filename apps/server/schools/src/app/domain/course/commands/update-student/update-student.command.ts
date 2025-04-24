import { ICommand } from '@nestjs/cqrs';
import { StudentSex } from '../../models/student-sex.model';

export class UpdateStudentCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly data: {
      firstname?: string;
      lastname?: string;
      gradeId?: string;
      avatarUrl?: string;
      birthday?: Date | null;
      sex?: StudentSex;
    }
  ) {}
}
