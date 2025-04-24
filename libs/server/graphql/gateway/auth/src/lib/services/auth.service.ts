import {
  Injectable,
  OnApplicationBootstrap,
  UnauthorizedException
} from '@nestjs/common';
import * as express from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { TokenManager } from './auth/token-manager';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(private readonly tokenManager: TokenManager) {}

  async onApplicationBootstrap() {
    await this.tokenManager.init();
  }

  async handle({ req }: { req: express.Request }) {
    if (req.headers.authorization) {
      const token = this.getToken(req.headers.authorization);
      const payload = await this.decodeToken(token);
      return {
        token,
        userId: payload.sub,
      };
    }
    return {
      token: null,
      userId: null,
    };
  }
  
  private getToken(authorization: string): string {
    if (!authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    return token;
  }

  private decodeToken(token: string): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        this.getKey.bind(this),
        (err, decoded) => {
          if (err) {
            reject(new UnauthorizedException(err, 'Invalid token'));
            return;
          }
          if (!decoded) {
            reject(new UnauthorizedException('Invalid token'));
            return;
          }
          resolve(decoded as JwtPayload);
        }
      );
    });
  }

  private getKey(header: any, callback: any) {
    return this.tokenManager.getKey(header, callback);
  }
}
