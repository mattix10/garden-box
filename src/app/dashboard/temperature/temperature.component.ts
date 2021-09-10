import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  constructor(private measurements: MeasurementsService) { }
  value: any;
  temperatureData: any[] = [];

  ngOnInit(): void {
    this.temperatureData = this.measurements.getTemperature();
  }

}
