import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'klazzroom-portal-pages-space-teacher-age-structure-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  private root!: am5.Root;

  sourceData: { birthday: Date; sex: string }[] = [];
  currentYear = new Date().getFullYear();
  pyramidSeriesMale: any;
  pyramidSeriesFemale: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private zone: NgZone
  ) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      const root = am5.Root.new('chartdiv');

      root.setThemes([am5themes_Animated.new(root)]);

      const container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.p100,
          height: am5.p100,
          layout: root.horizontalLayout,
        })
      );

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout,
        })
      );

      // Define data
      this.sourceData = [
        { birthday: new Date(), sex: 'Boy' },
        { birthday: new Date(), sex: 'Girl' },
      ];

      const pyramidChart = container.children.push(
        am5xy.XYChart.new(root, {
          width: am5.p50,
          panX: false,
          panY: false,
          wheelX: 'none',
          wheelY: 'none',
          layout: root.verticalLayout,
        })
      );

      // Add titles
      pyramidChart.children.unshift(
        am5.Label.new(root, {
          text: ' ',
          x: am5.p100,
          centerX: am5.p100,
        })
      );

      pyramidChart.children.unshift(
        am5.Label.new(root, {
          text: this.currentYear + '',
          fontSize: 20,
          x: am5.p100,
          centerX: am5.p100,
        })
      );

      // Add labels
      // Male label
      pyramidChart.plotContainer.children.push(
        am5.Label.new(root, {
          text: 'Males',
          fontSize: 20,
          x: am5.p100,
          y: 5,
          centerX: am5.p100,
          dx: -5,
          fill: am5.color(0x000000),
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.5,
          }),
        })
      );

      // Female label
      pyramidChart.plotContainer.children.push(
        am5.Label.new(root, {
          text: 'Females',
          fontSize: 20,
          y: 5,
          x: 5,
          fill: am5.color(0x000000),
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.5,
          }),
        })
      );

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      const pyramidXAxis = pyramidChart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: -20000,
          max: 20000,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
            strokeOpacity: 0.1,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      const yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 10,
        minorGridEnabled: true,
      });
      const pyramidYAxis = pyramidChart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'birthday',
          renderer: yRenderer,
        })
      );

      yRenderer.grid.template.setAll({
        location: 1,
      });

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      this.pyramidSeriesMale = pyramidChart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: pyramidXAxis,
          yAxis: pyramidYAxis,
          categoryYField: 'birthday',
          valueXField: 'boy',
          clustered: false,
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueX}',
          }),
        })
      );

      this.pyramidSeriesFemale = pyramidChart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: pyramidXAxis,
          yAxis: pyramidYAxis,
          categoryYField: 'birthday',
          valueXField: 'girl',
          clustered: false,
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueX}',
          }),
        })
      );

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      const pyradmidCursor = pyramidChart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          xAxis: pyramidXAxis,
          yAxis: pyramidYAxis,
        })
      );
      pyradmidCursor.lineX.set('visible', false);
      pyradmidCursor.lineY.set('visible', false);

      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

  getCurrentData() {
    const currentData: { birthday: Date; sex: string }[] = [];
    am5.array.each(this.sourceData, (row) => {
      const year = new Date(row.birthday).getFullYear();
      if (year == this.currentYear) {
        currentData.push(row);
      }
    });
    currentData.sort(function (a, b) {
      const a1 = a.birthday;
      const b1 = b.birthday;
      if (a1 > b1) {
        return 1;
      } else if (a1 < b1) {
        return -1;
      }
      return 0;
    });
    return currentData;
  }

  updateData() {
    const data = this.getCurrentData();
    const pyramidData = this.pyramidSeriesMale.data.values;

    if (data.length == 0) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    am5.array.each(pyramidData, (row: any, i) => {
      row = JSON.parse(JSON.stringify(pyramidData[i]));
      if (!data[i]) {
        row.boy = 0;
        row.girl = 0;
      } else {
        if (data[i].sex == 'Boy') {
          row.boy += 1;
        } else {
          row.girl += 1;
        }
      }
      this.pyramidSeriesMale.data.setIndex(i, row);
      this.pyramidSeriesFemale.data.setIndex(i, row);
    });
  }
}
