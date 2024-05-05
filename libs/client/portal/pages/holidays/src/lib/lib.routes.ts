import { Route } from '@angular/router';
import { FormComponent } from './containers/form/form.component';
import { ListComponent } from './containers/list/list.component';

export const clientPortalPagesHolidaysRoutes: Route[] = [
  {
    path: '',
    component: ListComponent,
    children: [
      { path: 'create', component: FormComponent },
      { path: ':holiday/edit', component: FormComponent },
      { path: ':holiday/delete', component: FormComponent },
    ],
  },
];
