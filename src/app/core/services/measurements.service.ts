import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  private socket: any;
  private route: string = '';
  data: any;

  dateSubject: BehaviorSubject<any> = new BehaviorSubject(new Date().toISOString());

  constructor(private http: HttpClient) {}

  getMeasurement(parameter: string, limit?: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${parameter}/oneDay/${limit}`).pipe(map(data => {
      return data.map((item:any) => {
        const itemValues = Object.values(item);
        const newItem = {
          value: itemValues[0],
          createdAt: itemValues[1]
        }
        return newItem;
      });
    }));
  }

  getDateMeasurement(parameter: string, date: string) {
    return this.http.get<any>(`${environment.API_URL}/${parameter}/11/${date}`).pipe(map(data => {
      return data.map((item:any) => {
        const itemValues = Object.values(item);
        const newItem = {
          value: itemValues[0],
          createdAt: itemValues[1]
        }
        return newItem;
      });
    }));
  }

  observer: any;

  getData2(route: string): Observable<any> {
      this.socket.on(this.route, (data: any) => {
        console.log(data)
        this.data = data;
        this.observer.next(data);
      })
      return this.getSocketDataObservable();
  };

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
}

  
}
