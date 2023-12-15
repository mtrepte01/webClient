import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatMessage } from './chatmessage';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { PostService } from './postService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html' ,
  providers: [],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'homes';
  posts:any;

  constructor(private service:PostService) {
  }

  @Input() chatMessageInput!: ChatMessage;

  public getMessage(){
    alert('Test');

    

    this.service.getPosts()
    .subscribe(response => {
      this.posts = response;
    });
  }

}
