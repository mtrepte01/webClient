import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root',
})

export class SignalRService {

    private hubConnection: signalR.HubConnection;

    public startConnection = () => {

        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5192/chatHub')
        .build();

        this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));
    }

    public addNewUserListener = (pCallback:any) => {
        this.hubConnection.on('newUser', (data) => {

            pCallback(data);
            console.log(data);
        })
    }

    public addLogoutUserListener = (pCallback:any) => {
        this.hubConnection.on('logoutUser', (data) => {

            pCallback(data);
            console.log(data);
        })
    }

    public addSendMessageListener = (pCallback:any) => {
        this.hubConnection.on('sendMessage', (pSender:string, pReceiver:string, pMessage:string) => {

            pCallback(pSender, pReceiver, pMessage);
        })
    }
}