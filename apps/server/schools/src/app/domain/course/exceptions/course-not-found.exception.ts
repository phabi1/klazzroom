export class CourseNotFoundException extends Error {
  static withId(id: string): CourseNotFoundException {
    return new CourseNotFoundException(`Course with id ${id} not found`);
  }
}
