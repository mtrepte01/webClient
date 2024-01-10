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
  chats: any;
  
  displayChat = false;

  @Input() username = new String();
  @Input() userId = new String();

  shownMessages: ChatMessage[] = [];

  chatMessageProp = {
    sender: 'Patrick',
    senderId: '',
    user: this.username,
    userId: '',
    message: '',
  };

  chatMessages = [
    {
        id: 0,
        idChatChannel: 0,
        message: "",
        sendDate: Date,
        isDeleted: Boolean
    },
  ];

  constructor(private service: PostService) {}

  public sendMessage() {
    this.chatMessageProp.user = this.username;

    console.log(this.chatMessageProp);
    //let input = this.chatMessage.user + " sent: " + this.chatMessage.message;
    //alert(input);
    var newMessage = {
      sender: 'Patrick',
      senderId: this.chatMessageProp.senderId,
      username: this.chatMessageProp.user,
      userId: this.chatMessageProp.userId,
      message: this.chatMessageProp.message,
    }
    //console.log(this.users);

    this.shownMessages.push(newMessage);
    
    this.chatMessageProp.message = '';
    
    this.service.sendMessage(1, 2, newMessage.message )
    .subscribe(response => {
      //this.posts = response;
      console.log(response);
    });

  }

  public LadeVerlauf() {
    this.displayChat = !this.displayChat;
    if (this.displayChat) {
    this.service.getMessages(1,2)
    .subscribe(response => {
      this.shownMessages = []
      this.chats = response;
      this.chatMessages = Array.from(this.chats)
      let message = this.chatMessages.map(chat => chat.message);
      message.forEach((text) => {
      this.shownMessages.push({sender: "Patrick", username: "Mike", message: text})
      })
    });}
  }
}
