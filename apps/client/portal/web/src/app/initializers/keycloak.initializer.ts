import { AssetService } from '@klazzroom/client-common-asset';
import { ConfigService } from '@klazzroom/client-common-config-core';
import { KeycloakService } from 'keycloak-angular';

export default function (
  keycloak: KeycloakService,
  configService: ConfigService,
  assetService: AssetService
) {
  return () =>
    configService.init().then(() => {
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
            window.location.origin +
            assetService.toUrl('assets/silent-check-sso.html'),
        },
      });
    });
}
