// Registracija ruta ovde

import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
///
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {EksponatComponent} from "./eksponat/eksponat.component";
import {ProfileContainerComponent} from "./user/profile-container/profile-container.component";
import {ChatComponent} from "./chat/chat.component";


const rute: Routes = [
  {path : '', component: WelcomeComponent},
  {path : 'signup', component: SignupComponent },
  {path : 'login', component: LoginComponent},
  {path : 'item', component: EksponatComponent},
  {path: 'profile' , component: ProfileContainerComponent },
  {path: 'chat' , component: ChatComponent }
];
@NgModule ({
  imports: [RouterModule.forRoot(rute)],
  exports: [RouterModule]
})
export class RoutingModule {}

