export class RemoveStudentFromCourseCommand {
  constructor(
    public readonly studentId: string,
    public readonly courseId: string
  ) {}
}
