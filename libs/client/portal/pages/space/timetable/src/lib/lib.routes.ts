import { Route } from '@angular/router';
import { ListComponent } from './containers/list/libs-client-portal-pages-timetable.component';

export const libsClientPortalPagesTimetableRoutes: Route[] = [
  { path: '', component: ListComponent },
  {
    path: ':timetableId',
    loadComponent: () =>
      import('./containers/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
];
