import { HttpException } from '@nestjs/common';

export class SpaceAlreadyExistsException extends HttpException {
  static withUserId(userId: string) {
    return new SpaceAlreadyExistsException(
      `Space already exists for user with id ${userId}`,
      409
    );
  }
}
