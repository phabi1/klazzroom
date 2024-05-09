import { Route } from '@angular/router';
import { PageComponent } from './containers/page/page.component';
import { ListComponent } from './containers/list/list.component';
import { FormComponent } from './containers/form/form.component';

export const clientSpaceTeacherTimetableRoutes: Route[] = [
  { path: '', component: ListComponent, children: [
    { path: 'add', component: FormComponent}
  ] },
  { path: ':id', pathMatch: 'full', component: PageComponent },
];
