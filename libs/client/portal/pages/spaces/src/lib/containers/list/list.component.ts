import { Component, OnInit } from '@angular/core';
import { Space, SpaceActions, SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'klazzroom-common-pages-spaces-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  spaces$!: Observable<Space[]>;
  loading$!: Observable<boolean>;
  empty$!: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.spaces$ = this.store.select(SpaceSelectors.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(SpaceActions.loadSpaces());
  }
}
