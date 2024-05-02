import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Space, SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import {
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
} from 'angular-gridster2';
import { Subject, takeUntil } from 'rxjs';
import { Widget } from '../../interfaces/widget.interface';

@Component({
  selector: 'klazzroom-client-portal-pages-dashboard-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit, OnDestroy {
  private _ngSubscribeAll = new Subject<void>();

  protected store = inject(Store);

  widgets: Widget[] = [];
  options: GridsterConfig;

  constructor() {
    this.options = {
      gridType: 'verticalFixed',
      outerMargin: true,
      outerMarginBottom: 16,
      outerMarginTop: 16,
      outerMarginLeft: 16,
      outerMarginRight: 16,
      maxCols: 12,
      minCols: 12,
      fixedRowHeight: 96,
      itemChangeCallback: PageComponent.itemChange,
      itemResizeCallback: PageComponent.itemResize,
    };
  }

  ngOnInit(): void {
    this.store
      .select(SpaceSelectors.selectCurrentSpace)
      .pipe(takeUntil(this._ngSubscribeAll))
      .subscribe((space) => {
        if (space) {
          this.loadWidgets(space);
        } else {
          this.widgets = [];
        }
      });
  }

  ngOnDestroy(): void {
    this._ngSubscribeAll.next();
    this._ngSubscribeAll.complete();
  }

  protected loadWidgets(space: Space): void {
    switch (space.type) {
      case 'AdministratorSpace':
        this.widgets = [
          { cols: 12, rows: 1, y: 0, x: 0, type: 'welcome', blank: true },
          { cols: 2, rows: 1, y: 0, x: 0, type: 'clock' },
        ];
        break;
      case 'TeacherSpace':
        this.widgets = [
          { cols: 12, rows: 1, y: 0, x: 0, type: 'welcome', blank: true },
          { cols: 2, rows: 1, y: 0, x: 0, type: 'clock' },
          { cols: 2, rows: 1, y: 0, x: 0, type: 'students' },
          { cols: 2, rows: 3, y: 0, x: 0, type: 'birthdays' },
        ];
        break;
      default:
        this.widgets = [];
        break;
    }
  }

  static itemChange(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    //
  }

  static itemResize(
    item: GridsterItem,
    itemComponent: GridsterItemComponentInterface
  ) {
    //
  }
}
