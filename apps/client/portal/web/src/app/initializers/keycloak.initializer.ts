import { KeycloakService } from "keycloak-angular";

export default function (keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://auth.docker.localhost',
        realm: 'klazzroom',
        clientId: 'client-portal-web',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}
