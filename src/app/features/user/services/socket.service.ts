import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8800');
    // https://locomatesocketbackend.onrender.com
  }

 getSocket() {
    return this.socket
 }
}
