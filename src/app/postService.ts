import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:4200/chat/';

  constructor(private httpClient: HttpClient) {}

  sendMessage(pIdSender: number, pIdReceiver:number, pMessage:string) {
    return this.httpClient.post(
      this.url + 'sendMessage'
        ,  { IdSender : pIdSender,  IdReceiver : pIdReceiver, Message: pMessage }
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

  loginUser(pName:string) {
    return this.httpClient.post(
      this.url + 'loginUser'
        ,  { Name : pName }
    );
  }

  logoutUser(pName:string) {
    return this.httpClient.post(
      this.url + 'logoutUser'
        ,  { Name : pName }
    );  
  }
}
