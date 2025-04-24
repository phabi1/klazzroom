import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { TokenManager } from './services/auth/token-manager';

@Module({
  providers: [
    AuthService,
    {
      provide: TokenManager,
      useFactory: (configService: ConfigService) => {
        return new TokenManager(
          configService.getOrThrow('auth.jwt.url')
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [AuthService],
})
export class LibsServerGraphqlGatewayAuthModule {}
