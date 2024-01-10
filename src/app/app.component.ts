import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chatmessage';

import { PostService } from './postService';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  providers: [],
  styleUrl: './app.component.css',
})
export class AppComponent {
  posts: any;

  @Input() username = new String();

  shownMessages: ChatMessage[] = [];

  chatMessageProp = {
    sender: 'Patrick',
    user: this.username,
    message: '',
  };

  constructor(private service: PostService) {}

  public addMessage(): ChatMessage[] {
    var messArr: ChatMessage[] = [];
  
    var newMessage = {
      sender: 'Patrick',
      username: this.chatMessageProp.user,
      message: this.chatMessageProp.message,
    }
    //console.log(this.users);

    this.shownMessages.push(newMessage);
    console.log(this.shownMessages)
    return this.shownMessages;
  }

  public sendMessage() {
    this.chatMessageProp.user = this.username;

    console.log(this.chatMessageProp);
    //let input = this.chatMessage.user + " sent: " + this.chatMessage.message;
    //alert(input);
    var newMessage = {
      sender: 'Patrick',
      username: this.chatMessageProp.user,
      message: this.chatMessageProp.message,
    }
    //console.log(this.users);

    this.shownMessages.push(newMessage);
    
    this.chatMessageProp.message = '';


    
    
    this.service.sendMessage()
    .subscribe(response => {
      //this.posts = response;
      console.log(response);
    });

  }
}
