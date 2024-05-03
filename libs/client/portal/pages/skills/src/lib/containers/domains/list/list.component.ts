import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject, map, takeUntil } from 'rxjs';
import { GET_DOMAINS_GQL } from '../../../graphql/queries';
import { Domain } from '../../../models/domain.model';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  private _ngSubscribeAll = new Subject<void>();
  private _apollo = inject(Apollo);

  public items: Domain[] = [];
  public displayedColumns: string[] = ['title', 'color', 'actions'];

  ngOnInit(): void {
    this._apollo
      .watchQuery<{ skillDomains: Domain[] }>({ query: GET_DOMAINS_GQL })
      .valueChanges.pipe(
        map((result) =>
          result.data.skillDomains
        ),
        takeUntil(this._ngSubscribeAll)
      )
      .subscribe((domains) => {
        this.items = domains;
      });
  }

  ngOnDestroy(): void {
    this._ngSubscribeAll.next();
    this._ngSubscribeAll.complete();
  }
}
