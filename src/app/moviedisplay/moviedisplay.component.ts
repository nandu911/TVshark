import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';
@Component({
  selector: 'app-moviedisplay',
  templateUrl: './moviedisplay.component.html',
  styleUrls: ['./moviedisplay.component.css']
})

@Injectable()
export class MoviedisplayComponent implements OnInit {

  movies: object;
  uri: string;
  getLink = 'http://api.tvmaze.com/shows';
  id: string;
  constructor(private https: HttpClient, private router: Router) { }

  ngOnInit() {
    this.https.get(this.getLink).subscribe(movies => {

      this.movies = movies;
    });

  }

  moreInfo(id: string) {
    this.id = id;
    this.router.navigate(['/moreinfo'], {queryParams: {property_id : this.id}, queryParamsHandling: 'merge'});
  }


}
