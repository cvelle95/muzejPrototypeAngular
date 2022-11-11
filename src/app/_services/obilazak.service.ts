import { Injectable } from '@angular/core';
import {ObilazakModel} from "../_models/obilazak.model";
import {PostavkaService} from "./postavka.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ObilazakService {

  static obilasci:Array<ObilazakModel> = [
    {id:1,status:'završen',korisnik_id:1, postavka_id:2,isRated:false},
    {id:2,status:'tekući',korisnik_id:1, postavka_id:3,isRated:true},
    {id:3,status:'tekući',korisnik_id:1, postavka_id:1,isRated:false},
    {id:4,status:'završen',korisnik_id:2, postavka_id:4,isRated:true},
    {id:5,status:'tekući',korisnik_id:2, postavka_id:5,isRated:false}
  ]

  constructor(private postavkaService:PostavkaService,private _snackBar: MatSnackBar) { }

  public getObilasciForUser(userId:number):any{
    let obilasciForUser: ObilazakModel[] = [];

    ObilazakService.obilasci.forEach(obilazak => {
      if(obilazak.korisnik_id == userId){
        obilazak.postavka = this.postavkaService.getPostavkaById(obilazak.postavka_id);
        obilasciForUser.push(obilazak);
      }
    })
    console.log(obilasciForUser)
    return obilasciForUser;
  }

  cancelObilazak(id:number){
    let index = ObilazakService.obilasci.findIndex(o => o.id == id);
    ObilazakService.obilasci.splice(index,1);
    console.log(ObilazakService.obilasci);
  }

  insertObilazak(status:string,korisnik_id:number,postavka_id:number){
    let obilazakIndex = ObilazakService.obilasci.length;
    const obilazakNew:ObilazakModel = new class implements ObilazakModel {
      id: number = obilazakIndex;
      korisnik_id: number = korisnik_id;
      postavka_id: number = postavka_id;
      status: string = "tekući";
      isRated: boolean = false;
    }
    ObilazakService.obilasci.push(obilazakNew);

  }


}
