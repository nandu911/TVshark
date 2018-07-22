import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './authservice';
import { HttpClient } from '../../node_modules/@angular/common/http';
import {SigninComponent} from './signin/signin.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SigninComponent]
})
export class AppComponent implements  OnInit   {
  title = 'app';
  constructor(private authService: AuthService, private http: HttpClient, private signin: SigninComponent) {

  }

  ngOnInit() {
    firebase.initializeApp({
    apiKey: 'AIzaSyAXjFqYxXX_WMnOjnrzeasNKaC0eYi8ERo',
    authDomain: 'tvshark-19dc4.firebaseapp.com'
    });
  }

  onLogout() {
    this.authService.logout();
    alert('Logged out Succesfuly');
  }
}
