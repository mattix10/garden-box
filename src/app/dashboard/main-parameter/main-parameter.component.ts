import { Component, Input, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-main-parameter',
  templateUrl: './main-parameter.component.html',
  styleUrls: ['./main-parameter.component.scss']
})
export class MainParameterComponent implements OnInit {

  @Input() parameter: any;
  measurement: any;
  constructor(private measurementService: MeasurementsService) { }

  ngOnInit(): void {
    this.measurement = this.measurementService.getData(this.parameter.name);
    console.log(this.measurement)
  }

}
