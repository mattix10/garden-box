import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  selectedParameter: MenuItem | any;
  parameters: MenuItem[] = [];

  constructor(private measurementsService: MeasurementsService, private menuItemsService: MenuItemsService) { }

  data: any;
  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: any )=> item.category == 'parameters');
    this.selectedParameter = this.parameters[0];
    this.data = this.measurementsService.getTemperature();
  }

  onSelectedParam(param: any) {
    console.log(param)
    this.selectedParameter = param;

    switch (param.title) {
      case 'Temperatura':
        this.data = this.measurementsService.getTemperature();
        break;
      case 'Wilgotność':
        this.data = this.measurementsService.getHumidity();
        break;
      case 'Oświetlenie':
        this.data = this.measurementsService.getLight();
        break;
      case 'Powietrze':
        this.data = this.measurementsService.getAir();
        break;
      default:
        this.data = this.measurementsService.getTemperature();
    }
    this.data = Object.assign([], this.data)
  }


}
