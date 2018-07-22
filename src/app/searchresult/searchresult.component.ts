import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';
import { Http } from '@angular/http';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  movieresult: object;
  getLink2 = 'http://api.tvmaze.com/search/shows?q=';
  searchtext: string;
  id: string;

  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.searchtext = params.search_text;
      this.getLink2 += this.searchtext;
      console.log(this.getLink2);
      this.http.get(this.getLink2).subscribe( show => {
        this.movieresult = show;
      });
     });
  }

  moreInfo(id: string) {
    this.id = id;
    this.route.navigate(['/moreinfo'], {queryParams: {property_id : this.id}, queryParamsHandling: 'merge'});
  }

}
