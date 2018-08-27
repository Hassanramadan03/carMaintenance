// Angular
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserService } from '../../service/user.service';

import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from '../../auth.guard';
import { MailListComponent } from './mail-list/mail-list.component';
import { EmailService } from '../../service/mails.service';

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    UserRoutingModule,
    HttpClientModule,
    NgxPaginationModule

  ],
  declarations: [

    AddAdminComponent,
    AddUserComponent,
    AllAdminsComponent,
    AllUsersComponent,
    UserDetailsComponent,
    MailListComponent
  ],
  providers: [
    UserService,
    AuthGuard,
    EmailService
  ],
})
export class UsersModule { }
