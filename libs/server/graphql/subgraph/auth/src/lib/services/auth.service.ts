import { Injectable } from '@nestjs/common';
import * as express from 'express';

@Injectable()
export class AuthService {
  handleAuth({ req }: { req: express.Request }) {
    return { req };
  }
}
