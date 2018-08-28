// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { PagesRoutingModule } from './pages-routing.module';
import { BrandService } from '../../service/brand.service';
import { Modelervice } from '../../service/model.service';
import { CarService } from '../../service/car.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from '../../auth.guard';
import { AuthInterceptor } from '../../auth.interceptor ';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceCenterComponent } from './sevicecenter/service-center.component';
import { ShowRoomComponent } from './showrooms/showroom.component';
import { AboutService } from '../../service/about.service';
import { ApiUrlService } from '../../service/api-url.service';




@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()


  ],
  declarations: [

    HomeComponent,
    AboutComponent,
    ServiceCenterComponent,
    ShowRoomComponent
  ],
  providers: [
    BrandService,
    Modelervice,
    CarService,
    AuthGuard,
    ApiUrlService,
    AboutService

  ],
})
export class PagesModule { }
