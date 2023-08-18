import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginResponse } from 'src/app/core/models/interface';



@Injectable({
  providedIn: 'root',
})
export class adminService {
  constructor(private http: HttpClient) {}

  private adminApi = 'http://localhost:3008/admin/';

  adminLogin(userData: object): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.adminApi}login`, userData);
  }

  
}
