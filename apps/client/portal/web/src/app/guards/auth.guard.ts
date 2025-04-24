import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (!keycloakService.isLoggedIn()) {
    // If not authenticated, redirect to the login page
    keycloakService.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }
  // If authenticated, check if the user has the required role
  const requiredRole = route.data['role'] as string;
  if (requiredRole && !keycloakService.isUserInRole(requiredRole)) {
    // If the user does not have the required role, redirect to the forbidden page 
    return router.createUrlTree(['/forbidden']);
  }
  return true;
};
