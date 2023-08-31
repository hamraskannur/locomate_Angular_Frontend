import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Post,
  User,
  chat,
  comment,
  loginResponse,
  message,
  notification,
  registerResponse,
} from '../../../core/models/interface';
import { Router } from '@angular/router';
import { UserState } from 'src/app/stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUserDataAndOptions } from 'src/app/stores/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserApiServiceService {
  constructor(private http: HttpClient, private router: Router,private store: Store<{ user: UserState }>) {}
  userDataAndOptions$ = this.store.select(selectUserDataAndOptions);


  private serverApi = 'http://localhost:3008/';
  // https://locomateserverbackend.onrender.com

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

  getSavedPost(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.serverApi}post/getSavedPost/${userId}`
    );
  }

  getUserAllPost(
    userId: string
  ): Observable<{ success: boolean; AllPosts: Post[]; message: string }> {
    return this.http.get<{
      success: boolean;
      AllPosts: Post[];
      message: string;
    }>(`${this.serverApi}post/getUserAllPost/${userId}`);
  }

  getFollowingUser(
    userId: string
  ): Observable<{ message: string; user: any[] }> {
    return this.http.get<{ message: string; user: any[] }>(
      `${this.serverApi}getFollowingUser/${userId}`
    );
  }

  getFollowersUser(
    userId: string
  ): Observable<{ message: string; user: any[] }> {
    return this.http.get<{ message: string; user: any[] }>(
      `${this.serverApi}getFollowersUser/${userId}`
    );
  }

  getFriendsAccount(userId: string): Observable<User> {
    return this.http.get<User>(`${this.serverApi}getFriendsAccount/${userId}`);
  }
  changeToPrivate(
    checked: boolean
  ): Observable<{ message: string; success: boolean }> {
    return this.http.put<{ message: string; success: boolean }>(
      `${this.serverApi}changeToPrivate`,
      { checked }
    );
  }
  searchUser(searchData: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.serverApi}searchUser`, {
      searchData,
    });
  }

  uploadImage(img: File): Observable<{ secure_url: string }> {
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'ete0nc34');
    return this.http.post<{ secure_url: string }>(
      'https://api.cloudinary.com/v1_1/dyujj6zhw/image/upload',
      formData
    );
  }


  uploadvideo(videoFile: File): Observable<{ secure_url: string }> {
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'ete0nc34');
    return this.http.post<{ secure_url: string }>('https://api.cloudinary.com/v1_1/dyujj6zhw/video/upload',formData);
  }

  uploadVideoDms(formData: {imageLinks:string,description:string}): Observable<{status:boolean}> {
    return this.http.post<{status:boolean}>(`${this.serverApi}video/uploadVideo`, formData);
  }


  saveUserData(formData: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.serverApi}updateUserData`, formData);
  }

  getAllRequest(): Observable<any> {
    return this.http.get<any>(`${this.serverApi}getAllRequest`);
  }

  followUser(formData: {
    followId: string;
  }): Observable<{ message: string; success: boolean }> {
    return this.http.put<{ message: string; success: boolean }>(
      `${this.serverApi}followUser`,
      formData
    );
  }

  

  deleteRequests(deleteId:string): Observable<any> {
    return this.http.delete<any>(`${this.serverApi}deleteRequests/${deleteId}`);
  }

  acceptRequest(acceptId:{acceptId:string}): Observable<any> {
    return this.http.put<any>(`${this.serverApi}acceptRequest`, acceptId);
  }

  savePost(postId:{postId:string}): Observable<{success:boolean,message:string}> {
    return this.http.put<{success:boolean,message:string}>(`${this.serverApi}post/savePost`, postId);
  }

  editPost(postData:{postId:string, newDescription:string}): Observable<{success:boolean,message:string}> {
    return this.http.put<{success:boolean,message:string}>(`${this.serverApi}post/editPost`, postData);
  }

  likePost(postId:string): Observable<{success:boolean,message:string}> {
    return this.http.get<{success:boolean,message:string}>(`${this.serverApi}post/likePostReq/${postId}`);
  }

  getAllNotifications(): Observable<{Status:boolean,user:notification[]}> {
    return this.http.get<{Status:boolean,user:notification[]}>(`${this.serverApi}getAllNotifications`);
  }

  getAllComment(postId:string): Observable<{success:boolean,comments:comment[],message:string}> {
    return this.http.get<{success:boolean,comments:comment[],message:string}>(`${this.serverApi}post/getComment/${postId}`);
  }

  postComment(postId:string, comment:string): Observable<any> {
    return this.http.post<any>(`${this.serverApi}post/postComment/${postId}`,{ comment });
  }

  getReplayComment(commentId:string): Observable<any> {
    return this.http.get<any>(`${this.serverApi}post/getReplayComment/${commentId}`);
  }

  postReplayComment(formData:{ commentId:string, newComment:string}): Observable<any> {
    return this.http.post<any>(`${this.serverApi}post/postReplayComment`, formData);
  }

  likeMainComment(formData:{ commentId:string}): Observable<{message:string,success:boolean}> {
    return this.http.post<{message:string,success:boolean}>(`${this.serverApi}post/likeMainComment`, formData);
  }

  likeReplayComment(formData:{ commentId:string}): Observable<{message:string,success:boolean}> {
    return this.http.post<{message:string,success:boolean}>(`${this.serverApi}post/likeReplayComment`, formData);
  }

  addPost(formData:{ imageLinks:string[],description:string}): Observable<{status:boolean}> {
    return this.http.post<{status:boolean}>(`${this.serverApi}post/addPost`, formData);
  }

  deletePost(postId:string): Observable<{message:string,success:boolean}> {
    return this.http.delete<{message:string,success:boolean}>(`${this.serverApi}post/deletePost/${postId}`);
  }

  getAllshorts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.serverApi}video/getAllPosts`);
  }

  getUserShorts(userId:string): Observable<{AllPosts:Post[],message:string,success:boolean}> {
    return this.http.get<{AllPosts:Post[],message:string,success:boolean}>(`${this.serverApi}video/getUserAllShorts/${userId}`);
  }

  getUserChat(userId:string): Observable<chat[]> {
    return this.http.get<chat[]>(`${this.serverApi}chat/${userId}`);
  }

  getMessages(chatId:string,userId:string): Observable<message[]> {
    return this.http.get<message[]>(`${this.serverApi}chat/getMessages/${chatId}/${userId}`);
  }

  sentMessage(formData:{senderId:string,text:string,chatId:string}): Observable<message> {
    return this.http.post<message>(`${this.serverApi}chat/addMessage`, formData);
  }

  getMessageCount(userId:string): Observable<number> {
    return this.http.get<number>(`${this.serverApi}chat/getCount/${userId}`);
  }

  createChat(formData:{senderId:string,receiverId:string}): Observable<chat> {
    return this.http.post<chat>(`${this.serverApi}chat/createChat`,formData);
  }
  messageView(id:string): Observable<string>{
    return this.http.get<string>(`${this.serverApi}chat/viewMessage/${id}`);
  }
}
