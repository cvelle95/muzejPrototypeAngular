import { Component, OnInit } from '@angular/core';
import {ObilazakService} from "../_services/obilazak.service";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { DialogComponent } from '../dialog/dialog.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ObilazakModel} from "../_models/obilazak.model";
import {PostavkaModel} from "../_models/postavka.model";
import {PostavkaService} from "../_services/postavka.service";

@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.css']
})
export class PlanerComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  obilasci:ObilazakModel[];
  ////// Podaci za star rating
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = []; // true = solid,false = blank
  /////
  prikaziRating:boolean = false;

  constructor(private userService: UserService,private obilazakService:ObilazakService,private router:Router,private activatedRoute: ActivatedRoute,public dialog:MatDialog,private _snackBar: MatSnackBar,private postavkaService: PostavkaService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    // punjenje araya za prikazivanje ratinga;
    //ako je korisnik ulogovan proveri da li je vec ocenio proizvod sa tim id-om,ako jeste napuni sa true sa vrednoscu ratinga a ostalo sa false do 5

    this.ratingArr = Array(this.starCount).fill(false);
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit(): void {
    if(UserService.isUserLogged){
      this.isUserLoggedIn = true;
      this.obilasci = this.obilazakService.getObilasciForUser(UserService.currentUser.id);
      this.obilasci.forEach(ob => {
        if (ob.status == "završen" && !ob.isRated){

          this.prikaziRating = true;
        }
      })
    }
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

  onCancel(orderId: any){
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(DialogComponent.answer){
        this.obilazakService.cancelObilazak(orderId);
        this.obilasci = this.obilazakService.getObilasciForUser(UserService.currentUser.id);
        console.log(orderId);
        this.router.navigate([this.router.url])
      }
    });
  }

  oceni(id:any):void{
    var postavka: PostavkaModel = this.postavkaService.getPostavkaById(id);

    let navigationExtras: NavigationExtras = { // pravljanje stejta za prosledjivanje id-a preko routera(mogu se prosledjivati celi modeli ovako)
      state: { // definisanje sta se salje
        item: postavka
      }
    }

    this.router.navigate(['item'],navigationExtras); //redirekcija i slanje stejta

  }

  // implementacija dodavanja recenzije
  onSubmit(data:any):any{

  }

}
