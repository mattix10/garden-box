import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  data: any;
  observer: any;
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

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
  }
}
