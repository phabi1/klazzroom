import { ConfigService } from '@klazzroom/client-common-config-core';
import { KeycloakService } from 'keycloak-angular';
import { filter, first, lastValueFrom } from 'rxjs';

export default function (
  keycloak: KeycloakService,
  configService: ConfigService
) {
  return () =>
    lastValueFrom(
      configService.init$.pipe(
        filter((v) => v),
        first()
      )
    ).then(() => {
      const confg = configService.getSettings('auth');
      return keycloak.init({
        config: {
          url: confg.endpoint,
          realm: confg.realm,
          clientId: confg.clientId,
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html',
        },
      });
    });
}
