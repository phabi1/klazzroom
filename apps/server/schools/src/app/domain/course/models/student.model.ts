export interface Student {
  readonly id: string;
  firstname: string;
  lastname: string;
  gradeId: string;
  avatarUrl: string;
  birthday: Date | null;
  sex: string;
}
