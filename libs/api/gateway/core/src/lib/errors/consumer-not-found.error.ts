export class ConsumerNotFoundError extends Error {
  static withId(id: string) {
    return new ConsumerNotFoundError('Consumer not found with id ' + id);
  }

  static withProvider(provider: string, value: string) {
    return new ConsumerNotFoundError(
      'Consumer not found with provider "' +
        provider +
        '" and value "' +
        value +
        '"'
    );
  }
}
