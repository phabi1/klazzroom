import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subject, map, takeUntil } from 'rxjs';
import { GET_DOMAIN_GQL, GET_ITEMS_GQL } from '../../../graphql/queries';
import { Domain } from '../../../models/domain.model';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  private _ngSubscribeAll = new Subject<void>();
  private _apollo = inject(Apollo);
  private _route = inject(ActivatedRoute);

  public domain: Domain | null = null;
  public items: Item[] = [];
  public displayedColumns: string[] = ['title', 'actions'];

  ngOnInit(): void {
    const domain = this._route.snapshot.params['domain'];
    this._apollo
      .query<{ skillDomain: Domain }>({
        query: GET_DOMAIN_GQL,
        variables: { id: domain },
      })
      .subscribe((result) => {
        this.domain = result.data.skillDomain;
      });
    this._apollo
      .watchQuery<{ skillItemsByDomain: Item[] }>({
        query: GET_ITEMS_GQL,
        variables: { domain },
      })
      .valueChanges.pipe(
        map((res) =>
          res.data.skillItemsByDomain
        ),
        takeUntil(this._ngSubscribeAll)
      )
      .subscribe((result) => {
        this.items = result;
      });
  }

  ngOnDestroy(): void {
    this._ngSubscribeAll.next();
    this._ngSubscribeAll.complete();
  }
}
