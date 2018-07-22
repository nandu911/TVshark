import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../authservice';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupMessage = '';
  password: string;
  postLink = 'https://tvshark-19dc4.firebaseio.com/';
  constructor(private authservice: AuthService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'password2': new FormControl(null, [Validators.required, this.passwordMatch.bind(this)])
    });
  }

  passwordUpdate() {
    this.password = this.signupForm.get('password').value;
  }

  passwordMatch(control: FormControl): {[s: string]: boolean} {
    if (!(control.value === this.password)) {
      return {'passwordsDonotMatch' : true};
    }
    return null;
  }

  signUp() {
    if (this.signupForm.status === 'VALID') {
      this.signupMessage = '';
      this.authservice.signupError = null;
      this.authservice.signupUser(this.signupForm.get('email').value, this.signupForm.get('password').value);
      setTimeout(() => {
        console.log(this.authservice.signupError);
        // this.postLink += this.signupForm.get('email').value;
        if (this.authservice.signupError === null) {
          // alert('inside if 1');
          this.postLink += this.signupForm.get('email').value.substring(0, this.signupForm.get('email').value.indexOf('.com')) ;
          this.postLink += '.json';
          console.log(this.postLink);

          this.http.put(this.postLink, {
              'firstname': this.signupForm.get('firstname').value,
              'lastname' : this.signupForm.get('lastname').value,
              'email': this.signupForm.get('email').value,
              'addfavclicked': false,
              'addfavclickedfirst': false
            }).subscribe(
          (response) => console.log(response),
          (error) =>  alert(error)
        );
        setTimeout(() => {
        alert('Signed Up Succesfully ! Login to your account');
        this.route.navigate(['/signin']);
        }, 1000);

        } else {
          alert(this.authservice.signupError);
          this.signupMessage = this.authservice.signupError;
        }
      }, 500);
    } else {
      this.signupMessage = 'Please correct the form and submit again !';
    }
  }
}
