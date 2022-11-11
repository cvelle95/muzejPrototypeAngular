import { Injectable } from '@angular/core';
import {PostavkaModel} from "../_models/postavka.model";
import {RecenzijeModel} from "../_models/recenzije.model";
import {EksponatModel} from "../_models/eksponat.model";
import {ObilazakService} from "./obilazak.service";
import {ObilazakModel} from "../_models/obilazak.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PostavkaService {

  static postavkaList: Array<PostavkaModel> = [
    {id:1, naziv: "Praistorija na Balkanu", opis:"Upoznajte praistoriju balkana kroz ovu postavku i upoznajte se sa bogatom kulturom stanovnika ovih prostora jos iz perioda 7. milenijuma pre nove ere " ,vrsta: 1, brojEksponata: 6, cena: 1200.00, vremeObilaska: " 1h:00min",slika: "./assets/praistorija-cover.jpg",eksponati:[
        {id:1,naziv: "Vrh koplja iz praistorije", opis:"Koplje korišćeno za lov u kamenom dobu", slika: "./assets/praistorijaKoplje.jpg"},
        {id:2,naziv: "Lady of Vinca", opis:"Figurica iz Vinčanske kulture poznata i kao 'Lady of Vinca' ", slika: "./assets/vincaFigura.jpg"},
        {id:3,naziv: "Mamut", opis:"Lobanja runastog mamuta,ogromne životinje koja je nekad krstarila stepama", slika: "./assets/mamut.jpg"},
        {id:4,naziv: "Praistorijski nakit", opis:"Nakit sa ovih prostora iz doba Vinčanske kulture napravljen od kosti i školjki", slika: "./assets/nakitVinca.jfif"},
        {id:5,naziv: "Orudje iz praistorije", opis:"Vrhovi orudja korišćenih u praistoriji napravljeni od kamena i obsidijana ", slika: "./assets/orudjeVinca.jfif"},
        {id:6,naziv: "Figura Dagona", opis:"Figura Boga Dagona, ribolikog božanstva koga su obožavale prve civilizacije balkana, a kasnije i najveće kulture mesopotamije", slika: "./assets/dagon.jpg"}
      ]},
    {id:2, naziv: "Antička istorija", opis:"Spektakularna postavka velikog istorijskog blaga antčkog perioda,vrhunca umetnosti i nauke pre pada u tamni srednji vek" ,vrsta: 1, brojEksponata: 5, cena: 2000.00, vremeObilaska: " 1h:15min",slika: "./assets/antika-cover.jpeg",eksponati:[
        {id:7,naziv: "Tutankamonova maska", opis:"Posmrtna maska faraona Tutankamona koji je započeo svoju vladavinu sa svega 9 godina.Jedna od retkih neopljačkanih grobnica prostora starog Egipta", slika: "./assets/tutankamon.jfif"},
        {id:8,naziv: "Antikitera mehanizam", opis:"Za sada najstariji otkriveni mehanički računar sa preko 70 zupčanika koji je računao položaje 5 planeta,sve mesečeve faze i pomračenja meseca i sunca. Otkriven u olupini ogromnog broda većeg od Titanika dužine oko 300 metara kod antikitere sa još mnogo amfora,bronzanih statua i drugim istorijskim artefaktima", slika: "./assets/antikitera.jfif"},
        {id:9,naziv: "Antičke vaze", opis:"Vaze oslikane motivima iz čuvenog Homerovog dela Ilijada", slika: "./assets/vaza.jpg"},
        {id:10,naziv: "Altar Pergamona", opis:"Ostaci oltara iz grada Pergamona u Maloj Aziji iz 2. veka pre nove ere", slika: "./assets/oltarPergamona.jpg"},
        {id:11,naziv: "Kruna cara Nimroda", opis:"Prelepa carska kruna iz antičkog Vavilona ", slika: "./assets/nimrod.jpg"},
      ]},
    {id:3, naziv: "Srednji vek", opis:"Pogledajte neke od najvrednijih relikvija kao i opreme ratnika i nakit srednjeg veka" , vrsta: 1, brojEksponata: 7, cena: 3000.00, vremeObilaska: " 2h:15min",slika: "./assets/srednji-cover.jpg",eksponati:[
        {id:12,naziv: "Ruka Svetog Jovana", opis:"Jedan od najcenjenijih relikvija srednjeg veka, ruka Sv Jovana Krstitelja", slika: "./assets/rukaJovanova.jpg"},
        {id:13,naziv: "Oprema vojnika iz ranijeg perioda", opis:"Oprema srpskog vojnika iz ranijeg srednjeg veka", slika: "./assets/oruzjeSrp.jpg"},
        {id:14,naziv: "Oprema oklopnika", opis:"Oprema srpskog oklopnika sa punim oklopom iz kasnog srednjeg veka", slika: "./assets/puniOklopSrp.jfif"},
        {id:15,naziv: "Čestica časnog krsta", opis:"Još jedna od najvećih relikvija srednjeg veka koja je stigla u Srbiju zajedno sa rukom Jovana Krstitelja sa jednim Ruskim vladarem", slika: "./assets/cesticaKrsta.jfif"},
        {id:16,naziv: "Srednjevekovni nakit", opis:"Razni nakit iz srednjeg veka", slika: "./assets/prstenje.jpg"},
        {id:17,naziv: "Kruna Nemanjića", opis:"Kruna Svetog kralja Stefana Uroša III Dečanskog, jedina javno dostupna sačuvana kruna iz Nemanjićke loze", slika: "./assets/krunaStefan.jpg"},
        {id:18,naziv: "Sprava za mučenje", opis:"Jedna od mnogih sprava za mučenje od lopova i kriminalaca do nepodobnih protivnika u srednjem veku", slika: "./assets/mucenjeSprava.jpg"},
      ]},
    {id:4, naziv: "Tito, čuvar ključa riznice", opis:"Deo predmeta iz jedne od riznica kojima je Tito imao pristup" ,vrsta: 1, brojEksponata: 4, cena: 1500.00, vremeObilaska: " 1h:20min",slika: "./assets/tito-cover.jfif",eksponati:[
        {id:19,naziv: "Kugla Tao Čin", opis:"Kugla koja je pripadala Šaolinskom manastiru koju je tito dobio od Kineskog ambasadora ", slika: "./assets/kuglaTito.jfif"},
        {id:20,naziv: "Kruna kraljice Marije", opis:"Kruna kraljice Marije Karadjordjević", slika: "./assets/marijakruna.jpg"},
        {id:21,naziv: "Plavi safir", opis:"Plavi safir ruske porodice romanov", slika: "./assets/plaviSafir.jpg"},
        {id:22,naziv: "Korintski šlem", opis:"Poklon kralja Grčke Pavla tadašnjoj Jugoslaviji", slika: "./assets/korintskiSlem.jpg"},
      ]},
    {id:5, naziv: "Izlozba slika poznatog umetnika", opis:"Za ljubitelje umetnosti trenutno dostupna postavka slika" ,vrsta: 2, brojEksponata: 3, cena: 1000.00, vremeObilaska: " 0h:45min",slika: "./assets/lubarda-cover.jfif",eksponati:[
        {id:1,naziv: "Kosovski boj", opis:"Umetnikov prikaz kosovskog boja", slika: "./assets/lubarda1.jpg"},
        {id:1,naziv: "Titograd", opis:"slika grada", slika: "./assets/lubarda2.jpg"},
        {id:1,naziv: "Industrijalizacija", opis:"Slika industrijalizacija", slika: "./assets/lubarda3.jpg"},
      ]}
    ];

  static recenzijePostavki: Array<RecenzijeModel> = [
    {id:1, ocena:5, komentar:"Sve preporuke,odlicna postavka",korisnik_id:1,postavka_id:1},
    {id:2, ocena:5, komentar:"Odlicno!",korisnik_id:1,postavka_id:2},
    {id:3, ocena:4, komentar:"Vredi pogledati",korisnik_id:2,postavka_id:2},
    {id:4, ocena:5, komentar:"Vrlo zanimljivi eksponati",korisnik_id:2,postavka_id:3},
    {id:5, ocena:4, komentar:"Zanimljivo i korisno",korisnik_id:1,postavka_id:3},
    {id:6, ocena:5, komentar:"Prezadovoljna eksponatima",korisnik_id:1,postavka_id:4},
    {id:7, ocena:3, komentar:"Ok je",korisnik_id:2,postavka_id:5}
  ]

  constructor() { }

  public getAll():any{
    let postavke : PostavkaModel[] = PostavkaService.postavkaList;
    return postavke;
  }

  public filterSearch(category: number,priceMin: any,priceMax: any) :any{
    let postavke : PostavkaModel[] = [];

    if(isNaN(priceMax) || priceMax > 999999 || priceMax == "" || priceMax==null){
      priceMax = 999999;
    }

    if(priceMin < 1 || isNaN(priceMin) || priceMin == ""){
      priceMin = 0;
    }

    if(category == 0){
      PostavkaService.postavkaList.forEach(postavka => {
        if(postavka.cena >= priceMin && postavka.cena <= priceMax)postavke.push(postavka)
      })
    }
    else{
        PostavkaService.postavkaList.forEach(postavka => {
          if(postavka.vrsta == category && postavka.cena >= priceMin && postavka.cena <= priceMax)postavke.push(postavka)
        })
    }
    return postavke;
  }

  getRatingForPostavka(id:number){
    let ratings: RecenzijeModel[] = [];

    PostavkaService.recenzijePostavki.forEach(rating => {
      if(rating.postavka_id === id)ratings.push(rating)
    })

    return ratings;
  }

  insertUserRating(ocena:number, komentar:string, korisnik_id:number, postavka_id: number):void{
    let id:number = PostavkaService.recenzijePostavki.length;

    const recenzija:RecenzijeModel = new class implements RecenzijeModel {
      id: number = id;
      komentar: string = komentar;
      korisnik_id: number = korisnik_id;
      ocena: number = ocena;
      postavka_id: number = postavka_id;
    }

    PostavkaService.recenzijePostavki.push(recenzija);
    let obilasci:ObilazakModel[] = ObilazakService.obilasci;
    obilasci.forEach(ob => {
      if (ob.postavka_id == postavka_id && ob.korisnik_id == UserService.currentUser.id){
        ob.isRated = true;
      }
    })
  }

  getEksponatiForPostavka(id:number):any{

    let eksponati:EksponatModel[] = [];

    PostavkaService.postavkaList.forEach(postavka => {
      if (postavka.id == id){
        postavka.eksponati.forEach(eksponat => {eksponati.push(eksponat)})
      }
    })
    return eksponati;
  }

  getPostavkaById(id:number):PostavkaModel{
    let returnPostavka:PostavkaModel;
    PostavkaService.postavkaList.forEach(postavka => {
      if (postavka.id == id){
        returnPostavka = postavka;
      }
    })
    return returnPostavka;
  }

}
