import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  constructor() { }

  temperatureData = [
    {
      date: '22:01',
      measure: '33.3'
    },
    {
      date: '22:02',
      measure: '33.7'
    },
    {
      date: '22:03',
      measure: '33.3'
    },
    {
      date: '22:04',
      measure: '33.4'
    },
    {
      date: '22:05',
      measure: '33.1'
    },
    {
      date: '22:06',
      measure: '33.2'
    },
    {
      date: '22:07',
      measure: '33.8'
    },
    {
      date: '22:08',
      measure: '33.5'
    },
    {
      date: '22:09',
      measure: '33.2'
    },
    {
      date: '22:10',
      measure: '33.1'
    },
  ]

  humidityData =[
    {
      date: '22:01',
      measure: '33.3'
    },
    {
      date: '22:02',
      measure: '33.7'
    },
    {
      date: '22:03',
      measure: '33.3'
    },
    {
      date: '22:04',
      measure: '33.4'
    },
    {
      date: '22:05',
      measure: '33.1'
    },
    {
      date: '22:06',
      measure: '33.2'
    },
    {
      date: '22:07',
      measure: '33.8'
    },
    {
      date: '22:08',
      measure: '33.5'
    },
    {
      date: '22:09',
      measure: '33.2'
    },
    {
      date: '22:10',
      measure: '33.1'
    },
  ]

  lightData = [
    {
      date: '22:01',
      measure: '33.3'
    },
    {
      date: '22:02',
      measure: '33.7'
    },
    {
      date: '22:03',
      measure: '33.3'
    },
    {
      date: '22:04',
      measure: '33.4'
    },
    {
      date: '22:05',
      measure: '33.1'
    },
    {
      date: '22:06',
      measure: '33.2'
    },
    {
      date: '22:07',
      measure: '33.8'
    },
    {
      date: '22:08',
      measure: '33.5'
    },
    {
      date: '22:09',
      measure: '33.2'
    },
    {
      date: '22:10',
      measure: '33.1'
    },
  ]

  air = [
    {
      date: '22:01',
      measure: '33.3'
    },
    {
      date: '22:02',
      measure: '33.7'
    },
    {
      date: '22:03',
      measure: '33.3'
    },
    {
      date: '22:04',
      measure: '33.4'
    },
    {
      date: '22:05',
      measure: '33.1'
    },
    {
      date: '22:06',
      measure: '33.2'
    },
    {
      date: '22:07',
      measure: '33.8'
    },
    {
      date: '22:08',
      measure: '33.5'
    },
    {
      date: '22:09',
      measure: '33.2'
    },
    {
      date: '22:10',
      measure: '33.1'
    },
  ]

  getTemperature() {
    return this.temperatureData;
  }

  getHumidity() {
    return this.humidityData;
  }

  getLight() {
    return this.lightData;
  }

  getAir() {
    return this.air;
  }
}
