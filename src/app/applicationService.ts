import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ApplicationService{

    public isOnline:boolean = false;
    public currentUser:string = '';
    public idCurrentUser:number = 0;
    public idCurrentReceiver:number = 0;

    public reset():void{
        this.isOnline = false;
        this.currentUser = '';
        this.idCurrentUser = 0;
        this.idCurrentReceiver = 0;
    }

}