import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  sliderTemperatureValue: number = 27;
  sliderHumidityValue: number = 75;
  sliderLightValue: number = 50;
  temperature: number = 100;

  private socket: any;
  private route: string = '';
  data: any;

  constructor() {}

  connect(route: string) {
    this.route = route;
    console.log(route)
    // this.socket = io.io(`http://localhost:5000/${route}`);
    console.log('connect with server');
    // this.socket = io.io(`http://localhost:5000/${route}`);
  }

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

  getData(name: string) {
    return this.temperatureData[0];
  }

  getChartOptions() {
    const chartOptions = {
      colors: ['#38AA73', ],
      legend: { position: 'none' },
      hAxis: {
        title: 'Godzina',
        titleTextStyle: {
          italic: false,
        }
      },
      vAxis: {
        title: '',
        titleTextStyle: {
          italic: false,
        }
      }
    };

    return chartOptions;
  }

  observer: any;

  getData2(route: string): Observable<any> {
    console.log(route);
    console.log(this.socket)
      this.socket.on(this.route, (data: any) => {
        console.log(data)
        this.data = data;
        this.observer.next(data);
      })
      return this.getSocketDataObservable();
  };

  unsub() {
    // this.socket = io.io(`http://localhost:5000/humidity`);
    this.socket.emit('unSubscribeToAddition', ()=> {

    })
  }

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
}

  // We define our Observer which will listen to messages
  // from our other components and send messages back to our
  // socket server whenever the `next()` method is called.


  // we return our Rx.Subject which is a combination
  // of both an observer and observable.

    // return this.socket.fromEvent(this.route).pipe(map((data: any) => data));


  temperatureData = [
    {
      date: '22:01',
      measure: '29.3'
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
      measure: '13'
    },
    {
      date: '22:02',
      measure: '8.7'
    },
    {
      date: '22:03',
      measure: '56.3'
    },
    {
      date: '22:04',
      measure: '32.4'
    },
    {
      date: '22:05',
      measure: '11.1'
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
