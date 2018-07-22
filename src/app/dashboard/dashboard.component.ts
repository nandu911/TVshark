import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  getLink = 'https://tvshark-19dc4.firebaseio.com/';
  emailLoggedIn: string;
  id: string;
  display = true;
  constructor(private authservice: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.emailLoggedIn = this.authservice.getCurrentUser().email;
          this.getLink += this.emailLoggedIn.substring(0, this.emailLoggedIn.indexOf('.com'));
          this.getLink += '.json/?auth=';
          console.log('current user email ' + this.emailLoggedIn);
          this.getLink += this.authservice.getToken();
          // console.log(this.getLink );
          this.http.get(this.getLink).subscribe( (user: any) => {
            this.user = user.favorites;
            console.log(this.user);
          });
          const length = +this.user.length;
          console.log('length:' + length);
          if (length < 1) {
            this.display = false;
          }
  }

  moreInfo(id: string) {
    this.id = id;
    this.router.navigate(['/moreinfo'], {queryParams: {property_id : this.id}, queryParamsHandling: 'merge'});
  }

}
