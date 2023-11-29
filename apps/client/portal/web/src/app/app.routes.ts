import { Routes } from '@angular/router';
import { selectSpaceGuard } from '@klazzroom/client-common-stores-spaces';
import { LayoutComponent } from '@klazzroom/client-common-ui-layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'spaces' },
      {
        path: 'spaces',
        loadChildren: () =>
          import('@klazzroom/client-common-pages-spaces').then(
            (m) => m.ClientCommonPagesSpacesModule
          ),
      },
      {
        path: 'space/:space',
        canActivate: [selectSpaceGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@klazzroom/client-common-pages-space-dashboard').then(
                (m) => m.ClientCommonPagesDashboardModule
              ),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('@klazzroom/client-common-pages-space-teacher-students').then((m) => m.StudentsModule),
          },
        ],
      },
    ],
  },
];
