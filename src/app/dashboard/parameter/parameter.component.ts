import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  chartType = ChartType;

  @ViewChildren('slider') slider: any = {value: 0};

  mode:boolean = false;
  sliderTemperature: number = 26;
  currentTemperature: number = 34;
  currentValue: number = 30;
  data: any = [];
  myOptions = {
    colors: ['#38AA73', ],
    legend: { position: 'none' },
    hAxis: {
      title: 'Godzina',
      titleTextStyle: {
        italic: false,
      }
    },
    vAxis: {
      title: 'Temperatura',
      titleTextStyle: {
        italic: false,
      }
    }
  };
  dataChart: any =[];

  constructor(private measurements: MeasurementsService,private ref: ChangeDetectorRef, private menuItemService: MenuItemsService, public breakpointObserver: BreakpointObserver, private router: Router, private location: Location) { }

  link: string = '';
  parameter: any;
  // max: number = 100;
  // min: number = 0;
  flag = false;
  ngOnInit(): void {
    this.getLink();
    this.getParameter();
    this.getData();
    this.createDataForChart();
    this.updateOptionTitle();
      console.log(this.myOptions)
    console.log(this.link)
    console.log(this.slider)
    this.updateValue(this.sliderTemperature);
    setTimeout(()=> {
      this.flag = true;
      console.log(this.slider.value)
    }, 500)
    console.log(this.data)
    this.currentValue = this.data[this.data.length-1].measure;
  }




  getLink() {
    this.link = this.extractChildUrl(this.location.path());
  }

  getParameter() {
    this.parameter = this.menuItemService.getMenuItems().find((item: any) => item.link == this.link);
  }

  getData() {
    switch (this.link) {
      case 'temperatura':
        this.data = this.measurements.getTemperature();
        break;
      case 'wilgotność':
        this.data = this.measurements.getHumidity();
        break;
      case 'powietrze':
        this.data = this.measurements.getAir();
        break;
    }
  }

  createDataForChart() {
    this.data.forEach((data: any) => {
      this.dataChart.push([data.date, +data.measure]);
    })
  }

  updateOptionTitle() {
    const title = `${this.parameter.title} [${this.parameter.unit}]`;
    this.myOptions.vAxis.title = title;
    this.dataChart = Object.assign([], this.dataChart);
  }


  extractChildUrl(path: string): string {
    let newPath = path.substring(1);
    const slashIndex = newPath.indexOf('/');
    newPath = newPath.substring(slashIndex + 1);

    return decodeURI(newPath);
  }

  updateValue(event: any) {
    console.log(event)
    this.slider.value = event?.value;
  }

  formatLabel(value: number | null) {
    if (!value) return 0;
     this.sliderTemperature= value;

    return value;
  }

}
