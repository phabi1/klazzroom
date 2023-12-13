import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface INavLink {
  type: 'item' | 'group' | 'folder';
  title: string | Record<string, string>;
  to: string;
  children?: INavLink[];
}

@Injectable()
export class NavigationService {
  constructor(private httpClient: HttpClient) {}

  getLinks(): Observable<INavLink[]> {
    return this.httpClient
      .get<{ links: INavLink[] }>('/assets/navigations/teacher.json')
      .pipe(map((response) => response.links));
  }
}
