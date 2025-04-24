import { Injectable, Logger } from '@nestjs/common';
import JwksRsa from 'jwks-rsa';

@Injectable()
export class TokenManager {
  private client!: any;

  constructor(private url: string) {}

  init() {
    this.client = JwksRsa({
      jwksUri: this.url,
    });
  }

  getKey(header: any, callback: any): void {
    this.client.getSigningKey(header.kid, (err: any, key: any) => {
      if (err) {
        callback(err);
      } else {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  }
}
