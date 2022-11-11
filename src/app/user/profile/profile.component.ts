import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserModel;
  isUserLoggedIn: boolean;
  isEditing: boolean;
  disabled: boolean;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.disabled = true;
    this.isEditing = false;
    this.isUserLoggedIn = UserService.isUserLogged;
    this.user = UserService.currentUser;

  }

  onSubmit(data:any){
    //proveri i posalji formu backendu ovde
    console.log(data);
    //postavi podatke iz forme u polja
    this.user.adresa = data.adress;
    this.user.telefon = data.phone;
    this.user.email = data.email;


    //vrati polja kako treba
    this.isEditing = false;
    this.disabled = true;
    //posalji nove podatke u bazu ovde
    this.userService.updateUser(this.user)
  }

  editMode(){
    this.isEditing = true;
    this.disabled = false;
  }

}
