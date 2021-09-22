import { Component, OnInit } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
@Component({
  selector: 'app-main-device',
  templateUrl: './main-device.component.html',
  styleUrls: ['./main-device.component.scss']
})
export class MainDeviceComponent implements OnInit {

  chartType: ChartType = ChartType.Bar;
  myOptions = {
    colors: ['#0D77B4', ],
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
  myData = [
    ['Wypełnienie zbiornika', 71],
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
