import { Route } from '@angular/router';
import { ListComponent } from './containers/list/list.component';

export const clientCommonPagesSpacesRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: ListComponent}
];
