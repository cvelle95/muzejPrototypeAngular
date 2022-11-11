import { Injectable } from '@angular/core';
import Pusher from "pusher-js";

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private Pusher: any;

  constructor() {
    /* Parmetre preuzimamo direktno sa servisa */
    this.Pusher = new Pusher('a859e95a0357df4105d3', {
      cluster: 'eu',
      //forceTLS: true
    });
  }

  /* Kada nam je potreban pusher, pozivamo ga kroz metod */
  getPusher(){
    return this.Pusher;
  }
}
