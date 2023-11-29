import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavLink } from '@klazzroom/client-common-ui-navbar';
import { Observable, map } from 'rxjs';

@Injectable()
export class NavigationService {
  constructor(private httpClient: HttpClient) {}

  getLinks(): Observable<NavLink[]> {
    return this.httpClient
      .get<{ links: NavLink[] }>('/assets/navigations/teacher.json')
      .pipe(map((response) => response.links));
  }
}
