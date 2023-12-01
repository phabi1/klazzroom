import { Routes } from '@angular/router';
import { selectSpaceGuard } from '@klazzroom/client-portal-stores-spaces';
import { LayoutComponent } from '@klazzroom/client-common-ui-layout';
import { IsLoggedGuard } from './guards/is-logged.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [IsLoggedGuard],
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'spaces' },
      {
        path: 'spaces',
        loadChildren: () =>
          import('@klazzroom/client-portal-pages-spaces').then(
            (m) => m.ClientPortalPagesSpacesModule
          ),
      },
      {
        path: 'space/:space',
        canActivate: [selectSpaceGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@klazzroom/client-portal-pages-space-dashboard').then(
                (m) => m.ClientPortalPagesDashboardModule
              ),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('@klazzroom/client-portal-pages-space-teacher-students').then((m) => m.SpaceTeacherStudentsModule),
          },
        ],
      },
    ],
  },
];
