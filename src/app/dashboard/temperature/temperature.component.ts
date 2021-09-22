import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { ChartType } from '../../core/enums/chartType';
import { Breakpoints } from '../../core/enums/Breakpoints';
import { Router } from '@angular/router';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  chartType = ChartType;

  @ViewChildren('slider') slider: any;


  constructor(private measurements: MeasurementsService, public breakpointObserver: BreakpointObserver, private router: Router) { }

  temperatureData: any[] = [];
  mode:boolean = false;
  sliderTemperature: number = 26;
  currentTemperature: number = 34;
  data: any = [];
  myOptions = {
    colors: ['#38AA73', ],
    legend: { position: 'none' },
    hAxis: {
      title: 'Godzina',
      titleTextStyle: {
        italic: false,
      }
    },
    vAxis: {
      title: 'Temperatura',
      titleTextStyle: {
        italic: false,
      }
    }
  };


  ngOnInit(): void {
    this.temperatureData = this.measurements.getTemperature();
    this.temperatureData.forEach((data: any) => {
      this.data.push([data.date, +data.measure]);
    })

    console.log()

  }

  updateValue(event: any) {
    this.slider.value = event?.value;
  }


  formatLabel(value: number | null) {
    if (!value) return 0;
    this.sliderTemperature = value; 
    return value;
  }

}
