import { Route } from '@angular/router';
import { libsClientPortalPagesSpaceSkillsRoutes } from '@klazzroom/libs-client-portal-pages-space-skills';
import {
  allowSpaceGuard,
  isOwnerSpaceGuard,
  redirectToSpaceGuard,
} from '@klazzroom/libs-client-portal-stores-space';
import { LibsClientPortalUiLayoutComponent } from '@klazzroom/libs-client-portal-ui-layout';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    component: LibsClientPortalUiLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [redirectToSpaceGuard],
        loadChildren: () =>
          import('@klazzroom/libs-client-portal-pages-home').then(
            (m) => m.libsClientPortalPagesHomeRoutes
          ),
      },
      {
        path: 'space/:spaceId',
        canActivate: [isOwnerSpaceGuard],
        canActivateChild: [allowSpaceGuard],
        data: {
          sidebar: 'space',
        },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '@klazzroom/libs-client-portal-pages-space-dashboard'
              ).then((m) => m.libsClientPortalPagesSpaceDashboardRoutes),
          },
          {
            path: 'skills',
            data: {
              space: ['administrator'],
            },
            children: libsClientPortalPagesSpaceSkillsRoutes,
          },
          {
            path: 'students',
            data: {
              space: ['teacher'],
            },
            loadChildren: () =>
              import('libs/client/portal/pages/space/teacher-students/src').then(
                (m) => m.libsClientPortalPagesSpaceStudentsRoutes
              ),
          },
        ],
      },
      {
        path: 'spaces',
        data: {
          sidebar: 'default',
        },
        loadChildren: () =>
          import('@klazzroom/libs-client-portal-pages-spaces').then(
            (m) => m.libsClientPortalPagesSpacesRoutes
          ),
      },
      {
        path: 'forbidden',
        loadChildren: () =>
          import('@klazzroom/apps-client-common-pages-error-forbidden').then(
            (m) => m.appsClientCommonPagesErrorForbiddenRoutes
          ),
      },
    ],
  },
];
