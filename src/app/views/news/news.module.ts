// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import{HttpClientModule, HttpClient} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {AddNewsComponent} from './add-news/add-news.component';
import {AllNewsComponent} from './all-news/all-news.component';
import {NewsDetailsComponent} from './news-details/news-details.component';
import {NewsRoutingModule} from './news-routing.module';
import { NewsService } from '../../service/news.service';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
   // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NewsRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()

  ],
  declarations: [
    AddNewsComponent,
    AllNewsComponent,
    NewsDetailsComponent
  
  ],
  providers: [
    NewsService
  ],
})
export class NewsModule { }
