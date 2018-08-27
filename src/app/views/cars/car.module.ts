// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import{HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {CarBrandComponent} from './car-brand/car-brand.component';
import {CarDetailsComponent} from './car-details/car-details.component';
import {CarModelComponent} from './car-model/car-model.component';
import {CarRoutingModule} from './car-routing.module';
import  {BrandService} from '../../service/brand.service';
import {Modelervice} from '../../service/model.service';
import { CarService } from '../../service/car.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from '../../auth.guard';
import { AuthInterceptor } from '../../auth.interceptor ';
import { AllCarsComponent } from './all-cars/all-cars.component';



@NgModule({
  imports: [
    CommonModule,
   // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CarRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()


  ],
  declarations: [
    
    CarBrandComponent,
    CarDetailsComponent,
    CarModelComponent,
    AllCarsComponent
  ],
  providers: [
    BrandService,
    Modelervice,
    CarService,
    AuthGuard,
  
  ],
})
export class CarModule { }
