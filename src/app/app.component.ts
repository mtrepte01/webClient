import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { PostService } from './postService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule, FormsModule],
  templateUrl: './app.component.html' ,
  providers: [],
  styleUrl: './app.component.css'
})
export class AppComponent {
  posts:any;
  
  chatMessage = {
    user: "",
    message: ""
  }

  constructor(private service:PostService) {
  }

  public getMessage(){
    console.log(this.chatMessage);
    //let input = this.chatMessage.user + " sent: " + this.chatMessage.message;
    //alert(input);

    this.chatMessage.message = "";

    this.service.getPosts()
    .subscribe(response => {
      this.posts = response;
    });
  }

}
