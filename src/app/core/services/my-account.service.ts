import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${API_URL}/user`)
  }
}
