import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './hero-service/in-memory-data.service';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {heroServiceProvider} from "./hero-service/hero-service.provider";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { LoginComponent } from './login/login.component';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    AppRoutingModule
  ],
  providers: [
    heroServiceProvider, AngularFirestore, AngularFireAuth, AngularFireAuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
