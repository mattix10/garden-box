import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'src/app/core/interfaces/ChartOptions';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
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
  selectedParameter: MenuItem | undefined;
  chartOptions: ChartOptions | any;
  myData = [
    ['22:01', 21.2],
    ['22:02', 21.0],
    ['22:03', 20.5],
    ['22:04', 20.3],
    ['22:05', 20]
  ];
  constructor(private menuItemsService: MenuItemsService, private measurementService: MeasurementsService) { }

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: any )=> item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    this.chartOptions = this.measurementService.getChartOptions();
    this.chartOptions.vAxis.title = this.parameters[0].unit;
  }

  onSelectedParam(param: any) {
    this.selectedParameter = param;
    this.chartOptions.vAxis.title = param.unit;
    this.myData = Object.assign([], this.myData)
  }


}
