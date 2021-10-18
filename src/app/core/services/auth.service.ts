import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  user: string = '';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/zaloguj`, {email, password}).pipe(tap((data:any) => {
      console.log(data)
      this.user = data.user
    }
    ));
  }

  registration(email: string, password: string): Observable<any>  {
    return this.http.post<any>(`${API_URL}/registration`, {email, password});
  }

  logout() {
    window.localStorage.clear();
    this.router.navigateByUrl('/zaloguj');
  }
}
