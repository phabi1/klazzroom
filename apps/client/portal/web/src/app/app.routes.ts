import { Route } from '@angular/router';
import { libsClientPortalPagesSpaceSkillsRoutes } from '@klazzroom/libs-client-portal-pages-space-skills';
import {
  allowSpaceGuard,
  isOwnerSpaceGuard,
  redirectToSpaceGuard,
} from '@klazzroom/libs-client-portal-stores-space';
import { LibsClientPortalUiLayoutComponent } from '@klazzroom/libs-client-portal-ui-layout';
import { authGuard } from './guards/auth.guard';
import { DashboardWidgetRegistryService } from 'libs/client/portal/pages/space/dashboard/src/lib/services/dashboard-widget-registry.service';

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
            providers: [
              {
                provide: DashboardWidgetRegistryService,
                useFactory: () => {
                  const service = new DashboardWidgetRegistryService();
                  service.register('welcome', () =>
                    import(
                      '@klazzroom/libs-client-portal-dashboard-widgets-welcome'
                    ).then((m) => m.WidgetComponent)
                  );
                  service.register('clock', () =>
                    import(
                      '@klazzroom/libs-client-portal-dashboard-widgets-clock'
                    ).then((m) => m.WidgetComponent)
                  );
                  service.register('students', () =>
                    import(
                      '@klazzroom/libs-client-portal-dashboard-widgets-weather'
                    ).then((m) => m.WidgetComponent)
                  );
                  return service;
                },
              },
            ],
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
              import(
                'libs/client/portal/pages/space/teacher-students/src'
              ).then((m) => m.libsClientPortalPagesSpaceStudentsRoutes),
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
