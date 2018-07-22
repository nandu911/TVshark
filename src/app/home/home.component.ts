import { Component, OnInit, AfterViewChecked, AfterViewInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from '../signin/signin.component';
import { AuthService } from '../authservice';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Subscription } from '../../../node_modules/rxjs';
// import { SignInService } from '../signin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SigninComponent]
})
@Injectable()
export class HomeComponent {
  // user: any ;
  username: string;
  subscription: Subscription;
  constructor(private http: HttpClient, private authservice: AuthService, private signin: SigninComponent) {
    /*this.authservice.userNameUpdated.subscribe(
      (username) => {console.log('sub: ' + username); this.username = username; }
    );*/
    this.subscription = this.authservice.getUsername().subscribe(
      (user) => {this.username = user; console.log('sub: ' + user); }
    );
    console.log ('home const:' + this.username );
     }

  ngonDestroy() {
    this.subscription.unsubscribe();
  }
}
