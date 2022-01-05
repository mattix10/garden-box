import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';

const DELAY = 1000;
@Injectable()
export class SocketService {
  
  private observer: Subscriber<any> = new Subscriber();
  listenParameterInterval: number;
  listenAllParametersInterval: number;
  emitValueInterval: number;
  emitAllValuesInterval: number;

  constructor(private socket: Socket) {}

  private getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
  }

  emitInitialValue(paramName: string, value: number): void {
    this.socket.emit('set'+paramName, value);
  }

  emitValue(paramName: string, value: any): void {
    this.emitValueInterval = window.setInterval(()=> {
      this.socket.emit(paramName);
    }, DELAY);
  }

  emitAllValues(parameterNames: string[]): void {
    parameterNames.forEach((param: string) => {
      this.socket.emit(param)
    });
    this.emitAllValuesInterval = window.setInterval(()=> {
      parameterNames.forEach((param: string) => {
        this.socket.emit(param)
      });
    }, DELAY);
  }

  listenParameter(paramName: string): Observable<any>{
    this.socket.once(paramName, (data: any) => {
      this.observer.next(data);
    })
    this.listenParameterInterval = window.setInterval(()=> {
      this.socket.once(paramName, (data: any) => {
        this.observer.next(data);
      })
    }, DELAY);

    return this.getSocketDataObservable();
  }

  listenAllParameters(parameterNames: string[]): Observable<any> {
    parameterNames.forEach((paramName: string) => {
      this.socket.once(paramName, (data: any) => {
        this.observer.next(data);
      });
    });

    this.listenAllParametersInterval = window.setInterval(()=> {
      parameterNames.forEach((paramName: string) => {
        this.socket.once(paramName, (data: any) => {
          this.observer.next(data);
        });
      });
    }, DELAY);
    return this.getSocketDataObservable();
  }

  removeListeners(): void {
    this.observer.next(null);
    clearInterval(this.listenParameterInterval);
    clearInterval(this.listenAllParametersInterval)
    clearInterval(this.emitValueInterval);
    clearInterval(this.emitAllValuesInterval);
  }
}
