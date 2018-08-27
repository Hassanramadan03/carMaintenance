// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import{HttpClientModule, HttpClient} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {AddFaqComponent} from './add-faq/add-faq.component';
import {AllFaqsComponent} from './all-faqs/all-faqs.component';
import {FaqDetailsComponent} from './faq-details/faq-details.component';
import {FAQsRoutingModule} from './faqs-routing.module';
import { FaqService } from '../../service/faq.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from '../../auth.guard';
import { AuthInterceptor } from '../../auth.interceptor ';

@NgModule({
  imports: [
    CommonModule,
   // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    FAQsRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()

  ],
  declarations: [
    AddFaqComponent,
    AllFaqsComponent,
    FaqDetailsComponent
 
  ],
  providers: [
   FaqService
  ],
})
export class FAQsModule { }
