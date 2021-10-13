import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class SocketService {
  
  observer: Subscriber<any> = new Subscriber();
  interval: number | undefined;
  interval2: number | undefined;
  interval3: number | undefined;
  interval4: number | undefined;

  constructor(private socket: Socket) {}

  emitInitValue(paramName: string, value: any) {
    this.socket.emit(paramName, value);
  }

  emitValue(paramName: string, value: any) {
    this.interval2 = window.setInterval(()=> {
      this.socket.emit(paramName, {value, time: 5000});
    }, 5000);
  }

  emitAllValues(parameterNames: string[]) {
    parameterNames.forEach((param: string) => {
      this.socket.emit(param, {time: 5000} )
    });
    this.interval3 = window.setInterval(()=> {
      console.log('tutaj')
      parameterNames.forEach((param: string) => {
        this.socket.emit(param, {time: 5000})
      });
    }, 5000);
  }

  listen(paramName: string): Observable<any>{
    this.socket.once(paramName, (data: any) => {
      this.observer.next(data);
    })
    this.interval = window.setInterval(()=> {
      this.socket.once(paramName, (data: any) => {
        this.observer.next(data);
      })
    }, 5000);

    return this.getSocketDataObservable();
  }

  listenAllParameters(parameterNames: string[]): Observable<any> {
    parameterNames.forEach((paramName: string) => {
      this.socket.once(paramName, (data: any) => {
        this.observer.next(data);
      });
    });

    this.interval4 = window.setInterval(()=> {
      parameterNames.forEach((paramName: string) => {
        this.socket.once(paramName, (data: any) => {
          this.observer.next(data);
        });
      });
    }, 5000);
    return this.getSocketDataObservable();
  }

  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
        this.observer = observer;
    });
  }

  removeListeners() {
    this.observer.next(null);
    clearInterval(this.interval);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    clearInterval(this.interval4)
  }
}
