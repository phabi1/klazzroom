import { Component, OnInit } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
} from 'angular-gridster2';
import { Widget } from '../../interfaces/widget.interface';

@Component({
  selector: 'klazzroom-client-portal-pages-dashboard-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
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
    this.widgets = [
      { cols: 12, rows: 1, y: 0, x: 0, type: 'welcome', blank: true},
      { cols: 2, rows: 1, y: 0, x: 0, type: 'clock' },
      { cols: 2, rows: 1, y: 0, x: 0, type: 'students' },
      { cols: 2, rows: 3, y: 0, x: 0, type: 'birthdays' },
    ];
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
