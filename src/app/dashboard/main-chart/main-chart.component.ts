import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions } from 'src/app/core/interfaces/ChartOptions';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { ChartService } from 'src/app/core/services/chart.service';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
import { ChartType } from '../../core/enums/chartType';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {

  @ViewChild('googleChart') google: any;

  chartType = ChartType;
  parameters: MenuItem[] = [];
  parametersTitle: string[] = [];
  selectedParameterTitle: string = '';
  selectedParameter: MenuItem | any;
  chartOptions: ChartOptions | any;
  dataChart: any[] = [];
  resultsLimit: number = 13;

  constructor(private chartService: ChartService, private menuItemsService: MenuItemsService, private measurementsService: MeasurementsService, private router: Router) { }

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: any )=> item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    if(this.router.url == '/panel/statystyki') {
      this.getDateMeasurement();
    } else this.getMeasurement(this.selectedParameter);
    this.chartOptions = this.chartService.getChartOptions();
    this.chartOptions.vAxis.title = this.parameters[0].unit;
  }

  onSelectedParam(param: MenuItem) {
    this.selectedParameter = param;
    if(this.router.url == '/panel/statystyki') {
      this.getDateMeasurement();
    } else this.getMeasurement(this.selectedParameter);
    this.chartOptions.vAxis.title = param.unit;
  }

  getMeasurement(param: any) {
    this.measurementsService.getMeasurement(param.name, this.resultsLimit).subscribe(data => {
      this.dataChart = this.chartService.createDataForChart(data);
    })
  }

  getDateMeasurement() {
    this.measurementsService.dateSubject.subscribe((choosenDate: string) => {
      console.log(choosenDate);
      this.measurementsService.getDateMeasurement(this.selectedParameter.name, choosenDate).subscribe(data => {
        console.log(data)
        this.dataChart = this.chartService.createDataForChart(data);
      });
    })
  }

}
