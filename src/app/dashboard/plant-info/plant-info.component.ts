import { Component, Input } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.scss']
})
export class PlantInfoComponent {

  @Input() currentValue: any = 70;
  chartType: ChartType = ChartType.Bar;

  constructor() { }

}
