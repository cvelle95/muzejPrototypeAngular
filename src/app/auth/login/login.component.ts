import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../_models/user.model";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorExists = false;
  errorText = "";

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService;
  }

  onSubmit(data:any) {
    // uzimanje podataka iz forme
    //proveri i posalji formu ovde

    var username = data.username;
    var password = data.password;

    this.userService.userLogin(username, password);
    var user: UserModel = UserService.currentUser;
    console.log(UserService.currentUser)

    if (this.userService.userLogin(username, password)) {
      this.router.navigate(["/"])
    } else {
      this.errorExists = true;
      this.errorText = "Incorrect username or password";
    }
  }

}
