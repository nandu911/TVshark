import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authservice';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {SignupComponent} from '../signup/signup.component';
// import { SignInService } from '../signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [SignupComponent]
})
@Injectable()
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loginMessage = 'login to start the fun !' ;
  emailLoggedIn: string;
  user: any;
  loggedInFirstName = {username : 'Your Dashboard'};
  getLink = 'https://tvshark-19dc4.firebaseio.com/';
  constructor(private authservice: AuthService, private router: Router, private http: HttpClient, private signup: SignupComponent) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
  }

  signin() {

    if (this.signinForm.status === 'VALID') {
      this.authservice.signinError = null;
      this.authservice.signinUser(this.signinForm.get('username').value, this.signinForm.get('password').value);
      setTimeout(() => {
        if (this.authservice.signinError === null) {
          this.loginMessage = 'LogIn Succesful';
          this.emailLoggedIn = this.authservice.getCurrentUser().email;
          this.getLink += this.emailLoggedIn.substring(0, this.emailLoggedIn.indexOf('.com'));
          this.getLink += '.json/?auth=';
          console.log('current user email ' + this.emailLoggedIn);
          this.getLink += this.authservice.getToken();
          // console.log(this.getLink );
          this.http.get(this.getLink).subscribe( user => {
            this.user = user;
          });
          setTimeout(() => {
          console.log(this.user);
          // this.loggedInFirstName.username = this.user.firstname;
          console.log(this.user.firstname);
          // this.authservice.userNameUpdated.emit(this.user.firstname);
          this.authservice.clearUsername();
          this.authservice.sendUsername(this.user.firstname);
          this.router.navigate(['/']);
          }, 1000);

        } else {
          this.loginMessage = this.authservice.signinError;
        }
      }, 1500);
    } else {
      this.loginMessage = 'Please enter valid user name and password';
    }
  }

  returnUserName(): any {
    return this.loggedInFirstName;
  }
}
