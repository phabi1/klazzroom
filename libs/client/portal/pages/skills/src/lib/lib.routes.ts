import { Route } from '@angular/router';
import { FormComponent as DomainFormComponent } from './containers/domains/form/form.component';
import { ListComponent as DomainListComponent } from './containers/domains/list/list.component';
import { FormComponent } from './containers/items/form/form.component';
import { ListComponent } from './containers/items/list/list.component';

export const clientPortalPagesSkillsRoutes: Route[] = [
  {
    path: '',
    component: DomainListComponent,
    children: [
      {
        path: 'create',
        component: DomainFormComponent,
      },
      {
        path: ':domain/edit',
        component: DomainFormComponent,
      },
    ],
  },
  {
    path: ':domain/items',
    component: ListComponent,
    children: [
      {
        path: 'create',
        component: FormComponent,
      },
      {
        path: ':id/edit',
        component: FormComponent,
      },
    ],
  },
];
