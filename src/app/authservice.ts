import * as firebase from 'firebase';
import { OnInit } from '../../node_modules/@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from '../../node_modules/rxjs';

export class AuthService implements OnInit {
    signupError = null;
    signinError = null;
    token: string;
    userNameUpdated = new EventEmitter <any> ();
    private subject = new BehaviorSubject <any> ();

    ngOnInit() {
    }

    sendUsername(username: any) {
        this.subject.next(username);
    }

    clearUsername() {
        this.subject.next();
    }

    getUsername (): Observable<any> {
        return this.subject.asObservable();
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => {alert(error); this.signupError = error; }
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {console.log(response);
            firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
            }
        ).catch(
            error => {this.signinError = error; }
        );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken() .then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getCurrentUser() {
      return firebase.auth().currentUser;
    }

}