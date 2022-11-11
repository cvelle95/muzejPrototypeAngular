import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PusherService} from "./pusher.service";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  korisnik: { prikaziIme: string, email: string };

  /* endpoint je instanca .env */
  private EndPoint = 'http://localhost:2000';
  private Channel: any;

  constructor(private PusherService: PusherService, private Http: HttpClient) {
    this.Channel = this.PusherService.getPusher().subscribe('cet-grupa');
  }

  /*
    kada korisnik pristupi cetovanju, pipe uzima vrednosti kao sto su ime, mejl adresa
    koji ce se koristiti tokom slanja poruka na cetu
   */
  join(param:any): Observable <any> {
    return this.Http.post(`${this.EndPoint}/join`, param)
      /* proveriti tap() */
      .pipe(tap(data=> {
        this.korisnik = param; //ocekuje api parametre
      }));
  }

  sendMessage(message: string): Observable<any> {
    const param = {
      message,
      type: 'covek',
      ...this.korisnik
    };
    return this.Http.post(`${this.EndPoint}/message`, param);
  }

  getChannel(){
    return this.Channel;
  }

}
