import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgSwitchDefault } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatUsers } from './users';
import { LoginComponent } from '../login/login.component';

import { PostService } from '../postService';
import { Observable, config } from 'rxjs';
import { AppComponent } from '../app.component';
import { ApplicationService } from '../applicationService';
import { SignalRService } from '../signalRService';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgClass, AppComponent, LoginComponent, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
  , providers: [ApplicationService]
})

export class UsersComponent {

  display = false;
  userList: any;
  selectedUser = "";
  selectedId = "";
  users = [
    {
      id: 0,
      name: "",
      currentStatus: "",
    },
  ];

  constructor(private service: PostService, public appService: ApplicationService, private signalRService: SignalRService) {
    this.getuserList();


  }

  ngOnInit() {
    this.signalRService.startConnection();

    this.signalRService.addNewUserListener((pData: any) => {
      this.setStatus(pData, 'online');
    });

    this.signalRService.addLogoutUserListener((pData: any) => {
      this.setStatus(pData, 'offline');
    });

    this.signalRService.addSendMessageListener((pSender: string, pReceiver: string, pMessage: string) => {
        if(this.appService.currentUser == pReceiver){
          alert('Nachricht von ' + pSender + ': ' + pMessage);
        }
    });
  }

  private setStatus(pUserName: string, pStatus: string) {

    let isNewUser: boolean = true;

    this.userList.forEach((pUser: any) => {
      if (pUser.name == pUserName) {
        isNewUser = false;
        pUser.currentStatus = pStatus;
      }
    });

    if (isNewUser) {
      this.getuserList();
    }
  }

  public toggleChat(username: string) {
    this.selectedUser = username;

    this.userList.forEach((pUser: any) => {
      if (pUser.name == username) {
        this.appService.idCurrentReceiver = pUser.id;
      }
    });

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

  public logout() {

    this.service.logoutUser(this.appService.currentUser)
      .subscribe(response => {
        //this.posts = response;
        this.appService.reset();
      });

  }

  //let input = this.chatMessage.user + " sent: " + this.chatMessage.message;
  //alert(input);


}
