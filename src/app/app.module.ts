import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "./routing.module";
import { UserService } from './_services/user.service';
import { PostavkeComponent } from './postavke/postavke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EksponatComponent } from './eksponat/eksponat.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileContainerComponent } from './user/profile-container/profile-container.component';
import { PlanerComponent } from './planer/planer.component';
import { DialogComponent } from './dialog/dialog.component';
import { ChatComponent } from './chat/chat.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    FooterComponent,
    PostavkeComponent,
    EksponatComponent,
    ProfileComponent,
    ProfileContainerComponent,
    PlanerComponent,
    DialogComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    RoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
