import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { verify } from 'jsonwebtoken';
import { join } from 'path';
import {
  INVALID_AUTH_TOKEN,
  INVALID_BEARER_TOKEN,
} from '../../auth.constants';
import { AuthIdentity } from '../../models/auth-identity.model';

@Injectable()
export class AuthService implements OnModuleInit {

  private publicKey: string;

  async onModuleInit() {
    await this.loadPublicKey();
  }

  handleAuth({ req }) {
    try {
      if (req.headers.authorization) {
        const token = this.getToken(req.headers.authorization);
        const decoded = this.decodeToken(token);
        return {
          userId: decoded.sub,
          authorization: `${req.headers.authorization}`,
        };
      }
    } catch (err) {
      throw new UnauthorizedException(
        'User unauthorized with invalid authorization Headers'
      );
    }
  }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new HttpException(
        { message: INVALID_BEARER_TOKEN },
        HttpStatus.UNAUTHORIZED
      );
    }
    return match[1];
  }

  private decodeToken(tokenString: string): AuthIdentity {
    const decoded = verify(tokenString, this.publicKey) as AuthIdentity;
    if (!decoded) {
      throw new HttpException(
        { message: INVALID_AUTH_TOKEN },
        HttpStatus.UNAUTHORIZED
      );
    }
    return decoded;
  }

  

  /**
   * Load public key
   */
  private async loadPublicKey (): Promise<void> {
    this.publicKey = await readFile(
      join(process.cwd(), 'certs', 'klazzroom-api-gateway.pem'),
      'utf-8'
    );
  }

}
