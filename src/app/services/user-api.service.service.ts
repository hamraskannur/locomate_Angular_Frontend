import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { loginResponse, registerResponse } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {

  constructor(private http: HttpClient) { }
  
  private serverApi="http://localhost:3008/"

  userRegister(userData:object): Observable<registerResponse> {
    return this.http.post<registerResponse>(`${this.serverApi}register`, userData)
  }

  verifyRegistration(id:string,token:string): Observable<registerResponse> {
    return this.http.get<registerResponse>(`${this.serverApi}verifyRegistration/${id}/${token}`)
  }

  userLogin(userData:object):Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.serverApi}login`, userData)
  }
  
}
