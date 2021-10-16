import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';;

@Component({
  selector: 'app-main-parameter',
  templateUrl: './main-parameter.component.html',
  styleUrls: ['./main-parameter.component.scss']
})
export class MainParameterComponent implements OnInit, OnChanges {

  @Input() parameter: any;
  @Input() currentValue:any;
  value: number | undefined;
  gray = '#e5e5e5'
  measurement: any;
  constructor(private measurementService: MeasurementsService) { }

  ngOnInit(): void {
    this.value = this.currentValue;
    // this.measurement = this.measurementService.getData(this.parameter.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.value = this.currentValue;

    // this.value = changes.currentValue.previousValue;
    // this.interval = window.setInterval(()=> {
    //   console.log(this.value, this.currentValue)
    //   if (changes.currentValue.previousValue < this.currentValue)  this.value++;
    //   if (this.value === this.currentValue) {
    //     clearInterval(this.interval);
    //     return;
    //   } 
    //   if (changes.currentValue.previousValue > this.currentValue)  this.value--;
    // }, 10)
  }

}
