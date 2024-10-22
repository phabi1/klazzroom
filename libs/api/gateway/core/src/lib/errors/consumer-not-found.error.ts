export class ConsumerNotFoundError extends Error {
  static withId(id: string) {
    return new ConsumerNotFoundError('Consumer not found with id ' + id);
  }
}
