import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetService } from '@klazzroom/client-common-asset';
import { Observable, map } from 'rxjs';
import { INavLink } from '../models/nav-link.model';

@Injectable()
export class NavigationService {

  constructor(
    private httpClient: HttpClient,
    private assetService: AssetService
  ) {}

  getLinks(name: string): Observable<INavLink[]> {
    return this.httpClient
      .get<{ links: INavLink[] }>(
        this.assetService.toUrl('assets/navigations/' + name + '.json')
      )
      .pipe(map((response) => response.links));
  }
}
