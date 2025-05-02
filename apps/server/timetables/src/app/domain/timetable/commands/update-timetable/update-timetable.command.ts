export class UpdateTimetableCommand {
  constructor(
    public readonly id: string,
    public readonly data: { title?: string; events?: any[]; tags?: string[] }
  ) {}
}
