import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5pluginsExporting from "@amcharts/amcharts5/plugins/exporting";
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';

interface Student {
  birthday: Date;
  sex: string;
}

@Component({
  selector: 'klazzroom-portal-pages-space-teacher-age-structure-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  private root!: am5.Root;

  @Input() students: Student[] = [];

  yAxis1: any;
  yAxis2: any;
  series: {male: any, female: any} = {male: null, female: null};

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private zone: NgZone
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students']) {
      this.updateData();
    }
  }

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
      const data = this.aggregateData(this.students);

      // ===========================================================
      // Root and wrapper container
      // ===========================================================

      // Create root and chart
      const root = am5.Root.new('chartdiv');

      const exporting = am5pluginsExporting.Exporting.new(root, {
        menu: am5pluginsExporting.ExportingMenu.new(root, {})
      });

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create wrapper container
      const container = root.container.children.push(
        am5.Container.new(root, {
          layout: root.horizontalLayout,
          width: am5.p100,
          height: am5.p100,
        })
      );

      // Set up formats
      root.numberFormatter.setAll({
        numberFormat: '#.##as',
      });

      // ===========================================================
      // XY chart
      // ===========================================================

      // Create chart
      const chart = container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: 'none',
          wheelY: 'none',
          layout: root.verticalLayout,
          width: am5.percent(60),
        })
      );

      // Create axes
      this.yAxis1 = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'age',
          renderer: am5xy.AxisRendererY.new(root, {
            minorGridEnabled: true,
            minGridDistance: 15,
          }),
        })
      );
      this.yAxis1.get('renderer').grid.template.set('location', 1);
      this.yAxis1.get('renderer').labels.template.set('fontSize', 12);
      this.yAxis1.data.setAll(data);

      this.yAxis2 = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'age',
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
          }),
        })
      );
      this.yAxis2.get('renderer').labels.template.set('fontSize', 12);
      this.yAxis2.data.setAll(data);

      const xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: -10,
          max: 10,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 40,
          }),
        })
      );

      // Create series
      this.series.male = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: 'Boys',
          xAxis: xAxis,
          yAxis: this.yAxis1,
          valueXField: 'male',
          categoryYField: 'age',
          clustered: false,
        })
      );

      this.series.male.columns.template.setAll({
        tooltipText: 'Males, age {categoryY}: {male})',
        tooltipX: am5.p100,
      });

      this.series.male.data.setAll(data);

      this.series.female = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: 'Girls',
          xAxis: xAxis,
          yAxis: this.yAxis1,
          valueXField: 'female',
          categoryYField: 'age',
          clustered: false,
        })
      );

      this.series.female.columns.template.setAll({
        tooltipText: 'Girls, age {categoryY}: {female})',
        tooltipX: am5.p100,
      });

      this.series.female.data.setAll(data);

      // Add labels
      chart.plotContainer.children.push(
        am5.Label.new(root, {
          text: 'Boys',
          fontSize: 20,
          y: 5,
          x: 5,
          //centerX: am5.p50,
          fill: this.series.male.get('fill'),
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.5,
          }),
        })
      );

      chart.plotContainer.children.push(
        am5.Label.new(root, {
          text: 'Girls',
          fontSize: 20,
          y: 5,
          x: am5.p100,
          centerX: am5.p100,
          dx: -5,
          fill: this.series.female.get('fill'),
          background: am5.RoundedRectangle.new(root, {
            fill: am5.color(0xffffff),
            fillOpacity: 0.5,
          }),
        })
      );
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

  private updateData() {
    const data = this.aggregateData(this.students);
    if (this.yAxis1 && this.yAxis2) {
      this.yAxis1.data.setAll(data);
      this.yAxis2.data.setAll(data);
      this.series.male.data.setAll(data);
      this.series.female.data.setAll(data);
    }
  }

  private aggregateData(list: Student[]) {
    const students = list
      .map((s) => ({ ...s, birthday: new Date(s.birthday) }))
      .sort((a, b) => a.birthday.getTime() - b.birthday.getTime());

    const data: { age: string; male: number; female: number }[] = [];

    for (let i = 0; i < students.length; i++) {
      const month =
        students[i].birthday.getMonth() +
        1 +
        '-' +
        students[i].birthday.getFullYear();
      let row = data.find((d) => d.age === month);
      if (!row) {
        row = { age: month, male: 0, female: 0 };
        data.push(row);
      }
      row.male += list[i].sex === 'Boy' ? -1 : 0;
      row.female += list[i].sex === 'Girl' ? 1 : 0;
    }
    return data;
  }
}
