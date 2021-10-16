import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log(email, password)
    return this.http.post<any>(`${API_URL}/zaloguj`, {email, password});
  }

  registration(email:string, password:string) {
    console.log(email, password)
  }

  logout() {
    window.localStorage.clear();
    console.log('logout')
  }
}
