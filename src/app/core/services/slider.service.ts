import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  sliderTemperatureValue: number = 27;
  sliderHumidityValue: number = 75;
  sliderLightValue: number = 50;

  constructor() { }

  getSliderValue(paramName: string): any {
    switch (paramName) {
      case ('temperature'):
        return this.sliderTemperatureValue;
      case ('light'):
        return this.sliderLightValue;
      case ('humidity'):
        return this.sliderHumidityValue;
    }
  }

  setSliderValue(paramName: string, value: number): any {
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
    }
  }
}
