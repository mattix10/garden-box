import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  sliderTemperatureValue: number = 27;
  sliderHumidityValue: number = 75;
  sliderLightValue: number = 50;
  sliderContainerValue: number = 0;

  constructor() { }

  getSliderValue(paramName: string): number  {
    switch (paramName) {
      case ('temperature'):
        return this.sliderTemperatureValue;
      case ('light'):
        return this.sliderLightValue;
      case ('humidity'):
        return this.sliderHumidityValue;
      case ('container'):
        return this.sliderContainerValue;
      default:
        return 0
    }
  }

  setSliderValue(paramName: string, value: number): void {
    switch (paramName) {
      case ('temperature'):
        this.sliderTemperatureValue = value;
        break;
      case ('light'):
        this.sliderLightValue = value;
        break;
      case ('humidity'):
        this.sliderHumidityValue = value;
        break;
      case ('container'):
        this.sliderContainerValue = value;
        break;
    }
  }
}
