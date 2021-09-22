import { Component, OnInit, ViewChildren } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss']
})
export class HumidityComponent implements OnInit {

  @ViewChildren('slider') slider: any;

  constructor(private measurementService: MeasurementsService) { }

  currentHumidity: any = 24;
  humidityData: any;
  mode:boolean = false;
  sliderHumidity: number = 26;

  ngOnInit(): void {
    this.humidityData = this.measurementService.getHumidity();
  }

  updateValue(event: any) {
    this.slider.value = event?.value;
  }


  formatLabel(value: number | null) {
    if (!value) {
      return this.sliderHumidity;
    }
    this.sliderHumidity = value;
   
    return value;
  }

}
