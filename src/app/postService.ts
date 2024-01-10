import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:5192/chat/';

  constructor(private httpClient: HttpClient) {}

  sendMessage(pIdSender: number, pIdReceiver:number, pMessage:string) {
    return this.httpClient.get(
      this.url + 'sendMessage' + '?idSender=' + pIdSender + '&idReceiver=' + pIdReceiver + '&message=' + pMessage
    );
  }

  getUsers() {
    return this.httpClient.get(this.url + 'getUsers');
  }

  getMessages(pIdSender: number, pIdReceiver: number) {
    return this.httpClient.get(
      this.url + 'getMessages' + '?idSender=' + pIdSender + '&idReceiver=' + pIdReceiver
    );
  }

  get() {
    return this.httpClient.get(this.url);
  }
}
