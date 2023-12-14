export class Holiday {
  public startAt: Date | null = null;
  public endAt: Date | null = null;

  constructor(startAt: Date | null = null, endAt: Date | null = null) {
    this.startAt = startAt;
    this.endAt = endAt;
  }

  isHoliday(date: Date): boolean {
    if (this.startAt === null && this.endAt === null) {
      return true;
    } else if (
      this.startAt === null &&
      this.endAt !== null &&
      this.endAt <= date
    ) {
      return true;
    } else if (
      this.startAt !== null &&
      this.startAt >= date &&
      this.endAt === null
    ) {
      return true;
    } else if (
      this.startAt !== null &&
      this.endAt !== null &&
      date >= this.startAt &&
      date <= this.endAt
    ) {
      return true;
    }

    return false;
  }
}
