import { Route } from '@angular/router';
import { PageComponent } from './containers/page/page.component';

export const clientSpaceTeacherTimetableRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: PageComponent },
];
