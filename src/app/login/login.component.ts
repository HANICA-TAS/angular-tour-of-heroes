import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( user => {
        this.router.navigate(['/dashboard']);
        this.user = user.user;
      }
    );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
