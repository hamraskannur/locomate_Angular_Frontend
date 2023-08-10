import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Post,
  User,
  loginResponse,
  registerResponse,
} from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiServiceService {
  constructor(private http: HttpClient) {}

  private serverApi = 'http://localhost:3008/';

  userRegister(userData: object): Observable<registerResponse> {
    return this.http.post<registerResponse>(
      `${this.serverApi}register`,
      userData
    );
  }

  verifyRegistration(id: string, token: string): Observable<registerResponse> {
    return this.http.get<registerResponse>(
      `${this.serverApi}verifyRegistration/${id}/${token}`
    );
  }

  userLogin(userData: object): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.serverApi}login`, userData);
  }

  getUser(): Observable<{ success: boolean; message: string; user: User }> {
    return this.http.get<{ success: boolean; message: string; user: User }>(
      `${this.serverApi}getMyProfile`
    );
  }

  getSuggestionUsers(): Observable<{
    status: boolean;
    notFollowedUsers: User[];
  }> {
    return this.http.get<{ status: boolean; notFollowedUsers: User[] }>(
      `${this.serverApi}suggestionUsers`
    );
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.serverApi}post/getAllPost`);
  }


  getSavedPost(userId:string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.serverApi}post/getSavedPost/${userId}`);
  }

  getUserAllPost(userId:string): Observable<{success:boolean,AllPosts:Post[],message:string}> {
    return this.http.get<{success:boolean,AllPosts:Post[],message:string}>(`${this.serverApi}post/getUserAllPost/${userId}`);
  }

  getFollowingUser(userId:string): Observable<{message:string,user:any[]}> {
    return this.http.get<{message:string,user:any[]}>(`${this.serverApi}getFollowingUser/${userId}`);
  }

  getFollowersUser(userId:string): Observable<{message:string,user:any[]}> {
    return this.http.get<{message:string,user:any[]}>(`${this.serverApi}getFollowersUser/${userId}`);
  }

  getFriendsAccount(userId:string): Observable<User> {
    return this.http.get<User>(`${this.serverApi}getFriendsAccount/${userId}`);
  }
  changeToPrivate(checked: boolean): Observable<{message:string,success:boolean}> {
    return this.http.put<{message:string,success:boolean}>(`${this.serverApi}changeToPrivate`, {checked});
  }
  searchUser(searchData: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.serverApi}searchUser`, {searchData});
  }
  
  uploadImage(img: File): Observable<{secure_url:string   }> {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ete0nc34");
    return this.http.post<{secure_url:string   }>("https://api.cloudinary.com/v1_1/dyujj6zhw/image/upload",formData );
  }
  saveUserData(formData: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.serverApi}updateUserData`, formData);
  }
  

}
