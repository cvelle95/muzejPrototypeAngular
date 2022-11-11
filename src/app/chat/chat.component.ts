import { Component, OnInit } from '@angular/core';
import { Chating } from "../interface/chating";
import { ChatService } from "../_services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // ovo su neke promenljive, clanovi podaci, koje klasa / komponenta, koristi kada joj treba nesto da sacuva sa cime radi...
  chats: Chating[] = [];
  message: string;
  sending: boolean;

  constructor(private ChatService: ChatService) { }

  ngOnInit(): void {
    this.ChatService.getChannel().bind('chat', (data: Chating) => { // pretplatimo se za chat servis na event koji se zove chat (to je custom event)
      if(data.email === this.ChatService.korisnik.email){ // kada god se preko servisa u chat kanalu desi event chat, stigne nam data u kojem je email onoga ko je cetovao..
        data.koJe = true; // proveravamo da li je poruka od nas, ako jeste neko KoJe stavimo da je true
      }
      this.chats.push(data); // i na kraju svakako dodamo u spisak chetova ovaj chat event data. spisak cetova je promenljiva (niz) u nasoj komponenti
    });
  }

  sendMessage(message: string){ // ovo je nasa funkcija koju komponenta ima na raspolaganju i trazi argument message koji se salje
    this.sending = true; // setujemo senting na true, da bi template prikazao poruku Salje se...
    this.ChatService.sendMessage(message).subscribe(
      resp => { // ishod: resolve - preko chat serivsa posaljemo poruku i pretplatimo se na event kada je zavrseno slanje
        this.message = undefined; // kada stigne da je poslato, mi resetujemo message na prazno, da bude prazan input
        this.sending = false; // i vratimo sending na Sent i to je to...
      },
      err => { // ishod - reject
        this.sending = false; // ako je doslo do greske pri slanju preko serivsa, message ostane sta je bio, ali se sending prekine...
      }
    );
  }

}
