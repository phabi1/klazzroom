import { Routes } from '@angular/router';
import { LayoutComponent } from '@klazzroom/client-common-ui-layout';
import { selectSpaceGuard } from '@klazzroom/client-portal-stores-spaces';
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
        data: { sidebar: 'space' },
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
            path: 'holidays',
            loadChildren: () =>
              import('@klazzroom/client-portal-pages-holidays').then(
                (m) => m.ClientPortalPagesHolidaysModule
              ),
          },
          {
            path: 'skills',
            loadChildren: () =>
              import('@klazzroom/client-portal-pages-skills').then(
                (m) => m.ClientPortalPagesSkillsModule
              ),
          },
          {
            path: 'students',
            loadChildren: () =>
              import(
                '@klazzroom/client-portal-pages-space-teacher-students'
              ).then((m) => m.SpaceTeacherStudentsModule),
          },
          {
            path: 'timetable',
            loadChildren: () =>
              import('@klazzroom/client-portal-space-teacher-timetable').then(
                (m) => m.ClientSpaceTeacherTimetableModule
              ),
          },
          {
            path: 'age-structure',
            loadChildren: () =>
              import(
                '@klazzroom/client-portal-pages-space-teacher-age-structure'
              ).then((m) => m.ClientPortalPagesSpaceTeacherAgeStructureModule),
          },
          {
            path: 'frieze-days',
            loadChildren: () =>
              import('@klazzroom/client-portal-space-teacher-frieze-days').then(
                (m) => m.ClientPortalSpaceTeacherFriezeDaysModule
              ),
          },
        ],
      },
    ],
  },
];
