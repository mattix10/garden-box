import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-air',
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.scss']
})
export class AirComponent implements OnInit {

  constructor(private measurementService: MeasurementsService) { }

  value: any;
  airData: any;

  ngOnInit(): void {
    this.airData = this.measurementService.getHumidity();
  }

}
