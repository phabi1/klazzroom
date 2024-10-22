/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConsumerNotFoundError,
  IConsumer,
} from '@klazzroom/libs-api-gateway-core';
import { Plugin } from '@klazzroom/libs-api-gateway-plugin';
import e from 'express';
import passport from 'passport';
import KeycloakBearerStrategy from 'passport-keycloak-bearer';

export interface KeycloakPluginOptions {
  authServerUrl: string;
  realm: string;
}

export class KeycloakPlugin extends Plugin<KeycloakPluginOptions> {
  override get name(): string {
    return 'keycloak';
  }
  override get version(): string {
    return '1.0.0';
  }

  static stategies: Record<string, KeycloakBearerStrategy> = {};

  async load(options: KeycloakPluginOptions): Promise<void> {
    const key = 'keycloak-' + options.authServerUrl + '-' + options.realm;

    if (!KeycloakPlugin.stategies[key]) {
      const strategy = new KeycloakBearerStrategy(
        {
          realm: options.realm,
          url: options.authServerUrl,
        },
        (token: any, done: any) => {
          const { Consumer } = this.app.get('models');
          Consumer.findByProvider(token.iss)
            .then((consumer: any) => {
              if (!consumer) {
                return Consumer.create({
                  email: token.email,
                  providers: {
                    [token.iss]: token.sub,
                  },
                });
              }
              return consumer;
            })
            .then((consumer: IConsumer) => {
              return done(null, {
                id: consumer.id,
              });
            })
            .catch(done);
        }
      );

      KeycloakPlugin.stategies[key] = strategy;

      passport.use(key, strategy as any);
    }

    this.registerHook('auth', {
      name: 'keycloak',
      handler: passport.authenticate(key, { session: false }),
      priority: 0,
    });
  }

  unload(): Promise<void> {
    return Promise.resolve();
  }
}
