import { Component } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgSwitchDefault } from '@angular/common';
import { ApplicationService } from '../applicationService';
import { PostService } from '../postService';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NgFor, NgClass, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })

  export class LoginComponent{

    constructor(public appService:ApplicationService, private service: PostService){
      
    }

    public loginUser(pLoginName:string){

      this.service.loginUser( pLoginName )
      .subscribe(response => {
        //this.posts = response;
        this.appService.isOnline = true;
        let respondedUser:any = response;
        this.appService.currentUser = respondedUser.name;
        this.appService.idCurrentUser = respondedUser.id;
      });

    }

  }