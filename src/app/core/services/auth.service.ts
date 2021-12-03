import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  user: string = '';

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_URL}/zaloguj`, {email, password})
    .pipe(
      tap((data: User) => {
      console.log(data)
      this.user = data.email
    }
    ));
  }

  registration(email: string, password: string): Observable<User>  {
    return this.http.post<User>(`${API_URL}/registration`, {email, password});
  }

  logout(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('/zaloguj');
  }
}
