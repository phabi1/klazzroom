import { Route } from '@angular/router';
import { LibsClientPortalPagesStickyNamesComponent } from './containers/templates/libs-client-portal-pages-sticky-names.component';
import { EditorComponent } from './containers/editor/editor.component';

export const libsClientPortalPagesStickyNamesRoutes: Route[] = [
  { path: '', component: LibsClientPortalPagesStickyNamesComponent },
  { path: ':id', component: EditorComponent },
];
