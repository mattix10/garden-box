import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<any> {
    console.log(`${environment.API_URL}/upload`)
    return this.http.post<any>(`${environment.API_URL}/upload`, formData);
  }

  getImages(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user/images`)
  }
}
