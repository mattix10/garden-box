import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { Subscription } from 'rxjs';
import { Measurement } from 'src/app/core/interfaces/Measurement';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { ChartService } from 'src/app/core/services/chart.service';
import { SliderService } from 'src/app/core/services/slider.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit, OnDestroy {

  @ViewChildren('slider') slider: {value: number} = {value: 0};

  mode: boolean = false;
  sliderLoaded: boolean = false;
  sliderValue: number | undefined;
  currentMeasurementValue: number | undefined;
  chartType = ChartType;
  dataChart: Array<Array<string|number>> = [];
  data: any = [];
  link: string = '';
  parameter: any;
  sub: Subscription = new Subscription();
  chartOptions: any;
  resultsLimit: number = 15;

  constructor(
    private chartService: ChartService, 
    private socketService: SocketService, 
    private measurementsService: MeasurementsService, 
    private menuItemService: MenuItemsService, 
    public breakpointObserver: BreakpointObserver, 
    private location: Location,
    private sliderService: SliderService) { 
  }

  ngOnInit(): void {
    this.getLink();
    this.getParameter();
    this.sliderValue = this.sliderService.getSliderValue(this.parameter.name);
    this.sub.add(this.socketService.listen(this.parameter.name)
      .pipe(
        // distinctUntilChanged((prev, curr) => prev.value === curr.value),
        filter((data: Measurement) => data.name === this.parameter.name )
      ).subscribe((data: Measurement) => {
        this.currentMeasurementValue = data.value;
        console.log(data)
      }));
    this.socketService.emitValue(this.parameter.name,this.slider.value);
    this.updateValue(this.slider);
    setTimeout(() => {
      this.sliderLoaded = true;
    }, 10);

    this.measurementsService.getMeasurement(this.parameter.name, this.resultsLimit ).subscribe(data =>{
      this.data = data;
      this.dataChart = this.chartService.createDataForChart(this.data);
      this.updateOptionTitle();}
    )
  }

  getLink() {
    this.link = this.extractChildUrl(this.location.path());
  }

  getParameter() {
    this.parameter = this.menuItemService.getMenuItems().find((item: MenuItem) => item.link == this.link);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.socketService.removeListeners();
  }

  updateOptionTitle() {
    const title = `${this.parameter.title} [${this.parameter.unit}]`;
    this.chartOptions = this.chartService.getChartOptions();
    this.chartOptions.vAxis.title = title;
    this.dataChart = Object.assign([], this.dataChart);
  }

  extractChildUrl(path: string): string {
    let newPath = path.substring(1);
    const slashIndex = newPath.indexOf('/');
    newPath = newPath.substring(slashIndex + 1);
    return decodeURI(newPath);
  }

  updateValue(event: any) {
    this.slider.value = event?.value;
    this.socketService.emitInitValue(this.parameter.name,this.slider.value);
    this.sliderService.setSliderValue(this.parameter.name, this.slider.value);
  }

  formatLabel(value: number | null) {
    if (!value) return 0;
    return value;
  }

}
