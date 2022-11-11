import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {PostavkaService} from "../_services/postavka.service";
import {UserService} from "../_services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PostavkaModel} from "../_models/postavka.model";
import {RecenzijeModel} from "../_models/recenzije.model";
import {UserModel} from "../_models/user.model";
import {EksponatModel} from "../_models/eksponat.model";
import {ObilazakService} from "../_services/obilazak.service";
import {ObilazakModel} from "../_models/obilazak.model";

@Component({
  selector: 'app-eksponat',
  templateUrl: './eksponat.component.html',
  styleUrls: ['./eksponat.component.css']
})
export class EksponatComponent implements OnInit {

  static selectedPostavka:PostavkaModel;
  item:any = EksponatComponent.selectedPostavka;
  selectedPostavka:PostavkaModel;
  userComents:RecenzijeModel[];
  currentUser:UserModel;
  listaEksponata:EksponatModel[];
  obilasci:ObilazakModel[];

  disabledRating: boolean = true;

  ////// Podaci za star rating
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = []; // true = solid,false = blank
  /////

  constructor(private router:Router,private postavkaService:PostavkaService,public userService:UserService,private activatedRoute: ActivatedRoute,private _snackBar: MatSnackBar,private obilazakService:ObilazakService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.item = this.router.getCurrentNavigation().extras.state['item'];
      EksponatComponent.selectedPostavka = this.item;

      console.log(EksponatComponent.selectedPostavka);

    }
    else{
      EksponatComponent.selectedPostavka = this.item;
    }
    // punjenje araya za prikazivanje ratinga;
    //ako je korisnik ulogovan proveri da li je vec ocenio proizvod sa tim id-om,ako jeste napuni sa true sa vrednoscu ratinga a ostalo sa false do 5

    this.ratingArr = Array(this.starCount).fill(false);
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit(): void {
    this.disabledRating = true;
    this.selectedPostavka = EksponatComponent.selectedPostavka;
    this.userComents = this.postavkaService.getRatingForPostavka(EksponatComponent.selectedPostavka.id);
    this.currentUser = UserService.currentUser;
    this.listaEksponata = this.postavkaService.getEksponatiForPostavka(EksponatComponent.selectedPostavka.id);

    if(UserService.isUserLogged){
      this.obilasci = this.obilazakService.getObilasciForUser(UserService.currentUser.id);
      this.obilasci.forEach(ob => {
        if (ob.status === "završen" && !ob.isRated && ob.postavka_id == this.selectedPostavka.id){
          this.disabledRating = false;
        }
      })
    }
    console.log(this.disabledRating)
  }

  ngOnDestroy(): void {
    this.disabledRating = true;
  }

  returnStar(i: number){
    if (this.rating >= i+1){
      return 'star';
    }
    else{
      return 'star_border';
    }
  }

  onStarClick(i: number){
    this.rating = i+1;
  }

  // implementacija dodavanja recenzije
  onSubmit(data:any):any{
    this.postavkaService.insertUserRating(this.rating,data.comment,this.currentUser.id,this.selectedPostavka.id);
    console.log(this.rating,data.comment,this.currentUser.id,this.selectedPostavka.id)

    let navigationExtras: NavigationExtras = { // pravljanje stejta za prosledjivanje
      state: { // definisanje sta se salje
        item: this.item
      }
    }

    this.ngOnInit();
    this.router.navigate([this.router.url],navigationExtras)

  }

  //implementacija dodavanja u planer i kupovine karte

  addToPlaner():void{
    if(UserService.isUserLogged){
      this.obilazakService.insertObilazak("tekući",UserService.currentUser.id,this.selectedPostavka.id);
      this._snackBar.open("Postavka je dodata u planer!","ok");
    }
    else{
      this._snackBar.open("Ulogujte se da bi dodali postavku u planer","ok");
      this.router.navigate(["/login"])
    }

  }

}
