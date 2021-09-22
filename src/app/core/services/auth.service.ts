import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    console.log(email, password)

    // return this.http
  }

  registration(email:string, password:string) {
    console.log(email, password)
  }

  logout() {
    console.log('logout')
  }
}
