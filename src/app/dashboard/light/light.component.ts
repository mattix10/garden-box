import { Component, OnInit, ViewChildren } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  @ViewChildren('slider') slider: any;

  lightData: any;
  mode:boolean = false;
  sliderLight: number = 26;

  constructor(private measurementService: MeasurementsService) { }

  ngOnInit(): void {
    this.lightData = this.measurementService.getLight();
  }

  updateValue(event: any) {
    this.slider.value = event?.value;
  }


  formatLabel(value: number | null) {
    if (!value) {
      return this.sliderLight;
    }
    this.sliderLight = value;
   
    return value;
  }

}
