import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorExists = false;
  errorText = '';

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(data:any){

    if(true){
      this.errorExists = false;
      var newUser = this.userService.registerUser(data.name,data.forename,data.email,data.adress,data.phone,data.username,data.password);
      console.log(newUser)
      this.errorText = "Uspesno ste se registrovali! Bicete automatski prebaceni na stranicu za logovanje";
      setTimeout(() => {
        console.log('sleep');
        this.router.navigate(['/login']);
      }, 1000);
    } else{
      this.errorText = "Korisnik sa tim korisnickim imenom vec postoji";
      this.errorExists = true;
    }

  }

}
