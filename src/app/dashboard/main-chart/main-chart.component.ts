import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';
import { ChartType } from '../../core/enums/chartType';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit {

  chartType = ChartType;
  parametersTitle: any = [];
  selectedParameterTitle: string = '';
  myData = [
    ['22:01', 21.2],
    ['22:02', 21.0],
    ['22:03', 20.5],
    ['22:04', 20.3],
    ['22:05', 20]
  ];

  selectedParameter: any;
  parameters: any = [];
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
      title: '',
      titleTextStyle: {
        italic: false,
      }
    }
  };
  constructor(private menuItemsService: MenuItemsService) { }

  @ViewChild('google') google: any;
  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: any )=> item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    this.myOptions.vAxis.title = this.parameters[0].unit;
  }

  onSelectedParam(param: any) {
    this.selectedParameter = param;
    this.myOptions.vAxis.title = param.unit;
    this.myData = Object.assign([], this.myData)
  }


}
