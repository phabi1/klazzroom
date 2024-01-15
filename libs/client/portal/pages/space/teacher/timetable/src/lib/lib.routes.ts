import { Route } from '@angular/router';
import { PageComponent } from './containers/page/page.component';
import { ListComponent } from './containers/list/list.component';

export const clientSpaceTeacherTimetableRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: ListComponent },
  { path: ':id', pathMatch: 'full', component: PageComponent },
];
