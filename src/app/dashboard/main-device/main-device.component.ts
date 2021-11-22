import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
@Component({
  selector: 'app-main-device',
  templateUrl: './main-device.component.html',
  styleUrls: ['./main-device.component.scss']
})
export class MainDeviceComponent {

  @Input() currentValue: any = null;
  chartType: ChartType = ChartType.Bar;

  constructor() { }

}
