import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {PostavkaService} from "../_services/postavka.service";
import {PostavkaModel} from "../_models/postavka.model";

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.css']
})
export class PostavkeComponent implements OnInit {

  constructor(private router: Router,private postavkaService:PostavkaService) { }

  postavke : PostavkaModel[];

  ngOnInit(): void {
    this.postavke = [];
    this.postavke = this.postavkaService.getAll();
    console.log(this.postavke);
  }

  categories = [
    {value: 0, viewValue: 'Sve'},
    {value: 1, viewValue: 'Istorija'},
    {value: 2, viewValue: 'Umetnost'}
  ]

  selectedCategories: any = 0;

  //isprazni niz sa postavkama po napustanju stranice
  ngOnDestroy(): void {
    this.postavke = []; //
  }

  openItem(id:any): void {
    var itemFound: any;
    console.log("clicked item "+id);
    this.postavke.forEach(postavka => {if(postavka.id == id )itemFound=postavka});

    let navigationExtras: NavigationExtras = { // pravljanje stejta za prosledjivanje id-a preko routera(mogu se prosledjivati celi modeli ovako)
      state: { // definisanje sta se salje
        item: itemFound
      }
    }

    this.router.navigate(['item'],navigationExtras); //redirekcija i slanje stejta
  }

  onSubmit(data:any){
    console.log(data);
    console.log(this.selectedCategories)
    const MAXIMUM_INT = 999999;

    var categoryId = this.selectedCategories;
    var priceMin = data.minPrice;
    var priceMax = data.maxPrice;

    if(priceMin < 1 || isNaN(priceMin) || priceMin == ""){
      priceMin = 0;
    }

    if(isNaN(priceMax) || priceMax > MAXIMUM_INT || priceMax == "" || priceMax == null){
      priceMax = MAXIMUM_INT;
    }

    console.log(priceMin,priceMax);

    this.postavke = this.postavkaService.filterSearch(categoryId,priceMin,priceMax);

    console.log(this.postavke);

  }

}
