import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  constructor(private router: Router ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.searchQuery = form.value.searchbox;
    console.log(this.searchQuery);
    this.router.navigate(['/searchresult'], {queryParams: {search_text : this.searchQuery}});
  }
}
