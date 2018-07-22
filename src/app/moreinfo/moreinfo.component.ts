import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../authservice';
import { Subscription } from '../../../node_modules/rxjs';


@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css'],
})
export class MoreinfoComponent implements OnInit {
  id: string;
  tvShow: any;
  episodes: Object;
  getLink = 'http://api.tvmaze.com/shows/';
  cast: object;
  postLink = 'https://tvshark-19dc4.firebaseio.com/';
  user: any;
  favorites: any[];
  temp: any[];
  final: any[];
  favmsg = 'Add to favourite';
  fav = true;
  emailLoggedIn: string;
  getLinkFirebase = 'https://tvshark-19dc4.firebaseio.com/';
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService) {
    /*this.subscription = this.authService.getUsername().subscribe(
      (user) => {this.user = user; console.log('more info const: ' + user);
    }
    );*/

   }

  ngOnInit() {
    this.emailLoggedIn = this.authService.getCurrentUser().email;
          this.getLinkFirebase += this.emailLoggedIn.substring(0, this.emailLoggedIn.indexOf('.com'));
          this.getLinkFirebase += '.json/?auth=';
          console.log('current user email ' + this.emailLoggedIn);
          this.getLinkFirebase += this.authService.getToken();
          // console.log(this.getLink );
          this.http.get(this.getLinkFirebase).subscribe( user => {
            this.user = user;
            console.log('inside subscribe ds:' + user);
          });
    console.log('inside moreinfo init');
    console.log('inside more init :' + this.user);
   this.route.queryParams.subscribe(params => {
    this.id = params['property_id'];
    this.getLink += this.id;
    console.log(this.getLink);
    this.http.get(this.getLink).subscribe( show => {

      this.tvShow = show;
    });
    this.http.get(this.getLink + '/episodes').subscribe( episode => {

      this.episodes = episode;
    });
    console.log(this.getLink + '/cast');
    this.http.get(this.getLink + '/cast').subscribe( cast => {

      this.cast = cast;
    });
   });
   // Favourites
  setTimeout(() => {
    if (this.user.addfavclicked === true && this.user.addfavclickedfirst === true) {
      this.favorites = this.user.favorites;
      console.log('moreinit check: ' + this.favorites);
      for ( let i = 0 ; i < this.favorites.length ; i++ ) {
        console.log('inside for loop' + this.tvShow.id);
        console.log('inside for loop: ' + this.favorites[i].id);
        if (this.favorites[i].id === this.tvShow.id) {
          this.fav = false;
          this.favmsg = 'Remove from favorites!' ;
          break;
        }
      }
    }
      if (this.user.addfavclicked === false && this.user.addfavclickedfirst === true) {
        this.favorites = this.user.favorites;
        console.log('moreinit check2: ' + this.favorites);
          console.log('inside for loop2' + this.tvShow.id);
          console.log('inside for loop2: ' + this.favorites['id']);
          if (this.favorites['id'] === this.tvShow.id) {
            this.fav = false;
            this.favmsg = 'Remove from favorites!' ;
          }
        }

  }, 500);
  }

  addToFav() {
    // 2nd part
    this.postLink = 'https://tvshark-19dc4.firebaseio.com/';
    this.favorites = [];
    console.log('inside addfav method');
    console.log(this.user.addfavclicked);
    console.log(this.user.addfavclickedfirst);
    if (this.user.addfavclicked === false && this.user.addfavclickedfirst === false) {
      console.log('inside addfav if block');
    console.log(this.favmsg);
    this.postLink += this.user.email.substring(0, this.user.email.indexOf('.com')) ;
    this.postLink += '.json';
    console.log(this.postLink);
    this.favmsg = 'Remove from favorites!' ;
    this.fav = false;
    this.http.put(this.postLink, {
      'firstname': this.user.firstname,
      'lastname' : this.user.lastname,
      'email': this.user.email,
      'addfavclicked': false,
      'addfavclickedfirst': true,
      'favorites': this.tvShow
    }).subscribe(
  (response) => {console.log(response); alert(this.tvShow.name + ' ' + 'added to your favorites!'); this.fav = false; },
  (error) =>  alert(error)
  );
  }

  if (this.user.addfavclicked === true || this.user.addfavclickedfirst === true) {
    console.log('inside addfav else block');
    const length = +this.user.favorites.length;
    console.log(length);
    for ( let i = 0 ; i < length ; i++ ) {
      console.log('inside forr loop: ' + this.user.favorites[i]);
      this.favorites.push(this.user.favorites[i]);
    }
    console.log('semi final array' + this.favorites);
    this.favorites.push(this.tvShow);
    console.log ('final array' + this.favorites);
    this.postLink += this.user.email.substring(0, this.user.email.indexOf('.com')) ;
    this.postLink += '.json';
    console.log(this.favorites);
    this.favmsg = 'Remove your favorites!' ;
    this.fav = false;
    this.http.put(this.postLink, {
      'firstname': this.user.firstname,
      'lastname' : this.user.lastname,
      'email': this.user.email,
      'addfavclicked': true,
      'addfavclickedfirst': true,
      'favorites': this.favorites
    }).subscribe(
  (response) => {console.log(response); alert(this.tvShow.name + ' ' + 'added to your favorites!'); this.fav = false; },
  (error) =>  alert('already added to your favorites!')
  );
  }


  }

  removeFav() {
    this.favorites = [];
    this.postLink = 'https://tvshark-19dc4.firebaseio.com/';
    console.log('inside removefav block');
    const length = +this.user.favorites.length;
    console.log(length);
    for ( let i = 0 ; i < length ; i++ ) {
      console.log('inside for loop: ' + this.user.favorites[i]);
      this.favorites.push(this.user.favorites[i]);
    }
    if (length === 1) {
      console.log ('lenght is one block');
      this.favorites.pop();
      this.postLink += this.user.email.substring(0, this.user.email.indexOf('.com')) ;
      this.postLink += '.json/';
      console.log(this.favorites);
      this.favmsg = 'Add to your favorites!' ;
      this.fav = true;
      console.log(this.postLink);
      this.http.put(this.postLink, {
        'firstname': this.user.firstname,
        'lastname' : this.user.lastname,
        'email': this.user.email,
        'addfavclicked': false,
        'addfavclickedfirst': false,
        'favorites': this.tvShow
      }).subscribe(
    (response) => {console.log(response); alert(this.tvShow.name + ' ' + 'Removed your favorites!'); this.fav = true; },
    (error) =>  alert('already added to your favorites!')
    );
    } else {
      for ( let j = 0 ; j < length ; j++ ) {
        console.log('inside remove for loop: ' + this.user.favorites[j]);
        if (this.favorites[j].id === this.tvShow.id) {
          this.favorites.splice(j, 1);
          break;
        }
      }
      console.log ('final array after removal: ' + this.favorites);
      this.postLink += this.user.email.substring(0, this.user.email.indexOf('.com')) ;
      this.postLink += '.json/';
      console.log(this.favorites);
      this.favmsg = 'Add to your favorites!' ;
      this.fav = true;
      console.log(this.postLink);
      this.http.put(this.postLink, {
        'firstname': this.user.firstname,
        'lastname' : this.user.lastname,
        'email': this.user.email,
        'addfavclicked': true,
        'addfavclickedfirst': true,
        'favorites': this.favorites
      }).subscribe(
    (response) => {console.log(response); alert(this.tvShow.name + ' ' + 'Removed your favorites!'); this.fav = true; },
    (error) =>  alert('already added to your favorites!')
    );
    }
  }

  ngonDestroy () {
    this.subscription.unsubscribe();
  }

}
