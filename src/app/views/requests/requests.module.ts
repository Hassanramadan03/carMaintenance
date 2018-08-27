// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ContactUsComponent } from './contactus/contact-us.component';
import { RequestQouteComponent } from './requestqoute/request-qoute.component';
import { RequestRoutingModule } from './requests-routing.module';
import { BrandService } from '../../service/brand.service';
import { Modelervice } from '../../service/model.service';
import { CarService } from '../../service/car.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from '../../auth.guard';
import { AuthInterceptor } from '../../auth.interceptor ';
import { ContactUsService } from '../../service/contact-us.service';
import { UserCarService } from '../../service/usercar.service';
import { RequestQouteService } from '../../service/request-qoute.service';




@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RequestRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()


  ],
  declarations: [

    ContactUsComponent,
    RequestQouteComponent
  ],
  providers: [
    BrandService,
    Modelervice,
    CarService,
    AuthGuard,
    ContactUsService,
    RequestQouteService,
    UserCarService
    
  ],
})
export class RequestModule { }
