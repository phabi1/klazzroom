import { Route } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { EditorComponent } from './containers/editor/editor.component';

export const clientPortalPagesSpaceTeacherStickyRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: ListComponent },
  { path: ':id', component: EditorComponent },
];
