import { Injectable } from '@angular/core';
import { UserModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static dummyUserList: Array<UserModel> = [
    {id:1,ime: "Ivan",prezime:"Cvetkovic",email:"cvetkovici888@gmail.com",adresa:"VV70",telefon:"12345678",username:"vani",password:"ivan1234"},
    {id:2,ime: "Jovana",prezime:"Vicic",email:"jvicic@gmail.com",adresa:"kg21",telefon:"13355678",username:"jovana",password:"jovana1234"}
  ]

  static currentUser: UserModel;
  static isUserLogged: boolean;

  constructor() { }

  getUserById(id:number): UserModel{
    var userFound: UserModel;
    userFound = null;

    UserService.dummyUserList.forEach(user => {if(user.id==id)userFound=user});

    // @ts-ignore
    return userFound;
  }

  getUserByUsername(username: string): UserModel{
    var userFound: UserModel;
    userFound = null;

    UserService.dummyUserList.forEach(user => {if(user.username === username )userFound=user});
    return userFound;
  }

  static isLoginOk:boolean = false;

///Login f-ja
  userLogin(username: string,password: string):boolean{
    var user: any = null;

    user = this.getUserByUsername(username);

    //ako je pronadjen user sa tim username,dakle user nije null
    if (user){
      // password je tacan, uloguj korisnika
      if (user.password === password && password !== null){
        UserService.currentUser = user;
        UserService.isUserLogged = true;
        UserService.isLoginOk = true;

        return UserService.isLoginOk;
      }
      else{
        return false;
      }
    }
    else{
      console.log(UserService.isLoginOk);
      return UserService.isLoginOk;
    }
  }

  /// signup f-ja,dodaj u static listu usera
  registerUser(ime: string,prezime: string,email: string,adresa:string,telefon: string,username: string,password: string) : UserModel{
    var id = UserService.dummyUserList[UserService.dummyUserList.length - 1].id + 1;

    // user objekat init i dodavanje vrednosti
    const user:UserModel = new class implements UserModel {
      email: string = email;
      id: number = id;
      ime: string = ime;
      password: string = password;
      prezime: string = prezime;
      adresa:string = adresa;
      telefon: string = telefon;
      username: string = username;
    };

    UserService.dummyUserList.push(user);

    return user;
  }

  //update info o useru
  updateUser(user: UserModel){

    let userIndex = UserService.dummyUserList.findIndex(userUbazi => userUbazi.id == user.id);
    UserService.dummyUserList[userIndex].email = user.email;
    UserService.dummyUserList[userIndex].telefon = user.telefon;
    UserService.dummyUserList[userIndex].adresa = user.adresa;

  }

}
