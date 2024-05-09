import { Component, OnInit, inject } from '@angular/core';
import { SpaceSelectors, TeacherSpace } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { switchMap } from 'rxjs';
import { GET_STICKIES_GQL } from '../../graphql/queries';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-sticky-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private store: Store = inject(Store);

  public items: any[] = [];

  ngOnInit(): void {
    this.store
      .select(SpaceSelectors.selectCurrentSpace)
      .pipe(
        switchMap((space) =>
          this.apollo.query<{ stickies: any[] }>({
            query: GET_STICKIES_GQL,
            variables: { tags: ['course:' + (space as TeacherSpace)?.course] },
          })
        )
      )
      .subscribe(({ data }) => (this.items = data.stickies));
  }
}
