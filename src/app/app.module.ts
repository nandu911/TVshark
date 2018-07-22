import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MoviedisplayComponent } from './moviedisplay/moviedisplay.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { MoreinfoComponent } from './moreinfo/moreinfo.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { SearchComponent } from './search/search.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {AuthService} from './authservice';
import { DashboardComponent } from './dashboard/dashboard.component';
// import {SignInService} from './signin.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'moviedisplay', component: MoviedisplayComponent},
  {path: 'moreinfo', component: MoreinfoComponent},
  {path: 'search', component: SearchComponent},
  {path: 'searchresult', component: SearchresultComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MoviedisplayComponent,
    HomeComponent,
    MoreinfoComponent,
    SearchComponent,
    SearchresultComponent,
    ContactComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    JsonpModule,
    Ng2PaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
