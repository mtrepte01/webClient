import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgSwitchDefault } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatUsers } from './users';

import { PostService } from '../postService';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgClass, AppComponent, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent{
  display = false;
  userList: any;
  selectedUser = "";
  users = [
    {
        id: 0,
        name: "",
        currentStatus: "",
    },
  ];

  constructor(private service: PostService) {
    this.getuserList();
  }

  public toggleChat(username: string) {
    this.selectedUser = username;
    if (!this.display)
    this.display = !this.display;
  }

  public getuserList(): ChatUsers[] {
    this.service.getUsers().subscribe((response) => {
      this.userList = response;
      this.users = Array.from(this.userList);      

      return this.users;
    });

    return [];
  }


    //let input = this.chatMessage.user + " sent: " + this.chatMessage.message;
    //alert(input);


}
