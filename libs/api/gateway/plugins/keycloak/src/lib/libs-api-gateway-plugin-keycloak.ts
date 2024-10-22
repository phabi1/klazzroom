import { IPlugin, IPluginOptions } from '@klazzroom/libs-api-gateway-plugin';
import passport from 'passport';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer';

export interface KeycloakPluginOptions extends IPluginOptions {
  authServerUrl: string;
  realm: string;
}

export class Plugin implements IPlugin<KeycloakPluginOptions> {
  get name(): string {
    return 'keycloak';
  }
  get version(): string {
    return '1.0.0';
  }
  async load(ctx: any, options: KeycloakPluginOptions): Promise<void> {
    passport.use(
      new KeycloakBearerStrategy(
        {
          url: options.authServerUrl,
          realm: options.realm,
        },
        (jwtPayload: any, done: (err: Error | null, user: any) => void) => {
          done(null, { uid: 1 });
        }
      )
    );

    ctx.register('auth', {
      handle: passport.authenticate('keycloak', { session: false }),
      priority: 0,
    });
  }
  unload(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
