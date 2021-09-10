import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  value = 0;
  lightData: any;

  constructor(private measurementService: MeasurementsService) { }

  ngOnInit(): void {
    this.lightData = this.measurementService.getLight();
  }

}
