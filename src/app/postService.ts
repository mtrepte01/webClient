import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:5192/chat/';

  constructor(private httpClient: HttpClient) {}

  sendMessage() {
    return this.httpClient.post(
      this.url + 'sendMessage',
      { idSender: 1, message: 'Test' },
    );
  }

  getUsers() {
    return this.httpClient.get(this.url + 'getUsers');
  }

  get() {
    return this.httpClient.get(this.url);
  }
}
