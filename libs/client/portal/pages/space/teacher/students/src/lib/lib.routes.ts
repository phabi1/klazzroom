import { Route } from '@angular/router';
import { ListComponent } from './containers/list/list.component';

export const studentsRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: ListComponent}
];
