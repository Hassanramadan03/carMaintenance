// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import{HttpClientModule, HttpClient} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {AddBlogComponent} from './add-blog/add-blog.component';
import {AllBlogsComponent} from './all-blogs/all-blogs.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
import {BlogRoutingModule} from './blogs-routing.module';
import { BlogsService } from '../../service/blogs.service';
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
    BlogRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()

  ],
  declarations: [
    
    AddBlogComponent,
    AllBlogsComponent,
    BlogDetailsComponent
  ],
  providers: [
    BlogsService
  ],
})
export class BlogsModule { }
