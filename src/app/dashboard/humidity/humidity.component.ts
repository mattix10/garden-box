import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {

  constructor(private measurementService: MeasurementsService) { }

  value: any;

  humidityData: any;

  ngOnInit(): void {
    this.humidityData = this.measurementService.getHumidity();
  }

}
