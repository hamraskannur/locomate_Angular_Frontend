import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, User, loginResponse } from 'src/app/core/models/interface';



@Injectable({
  providedIn: 'root',
})
export class adminService {
  constructor(private http: HttpClient) {}

  private adminApi = 'http://localhost:3008/admin/';

  adminLogin(userData: object): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.adminApi}login`, userData);
  }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.adminApi}getAllUser`);
  }
  blockUser(status:boolean, userId:string):Observable<{status:boolean}> {
    return this.http.get<{status:boolean}>(`${this.adminApi}changeStatus/${status}/${userId}`);
  }
  
  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`${this.adminApi}getAllPost`);
  }
  getVideos():Observable<Post[]> {
    return this.http.get<Post[]>(`${this.adminApi}getAllVideo`);
  }

  getChart():Observable<any> {
    return this.http.get<any>(`${this.adminApi}getChart`);
  }

  
}
