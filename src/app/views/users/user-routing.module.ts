import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AllAdminsComponent } from './all-admins/all-admins.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from '../../auth.guard';
import { MailListComponent } from './mail-list/mail-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      {
        path: 'add-admin',
        component: AddAdminComponent,
        data: {
          title: 'add-admin'
        }
      },
      {
        path: 'edit-admin/:id',
        component: AddAdminComponent,
        data: {
          title: 'edit-admin'
        }
      },
      {
        path: 'all-admins',
        component: AllAdminsComponent,
        data: {
          title: 'all-admins'
        }
      },
      {
        path: 'add-customer',
        component: AddUserComponent,
        data: {
          title: 'add-customer'
        }
      },
      {
        path: 'edit-customer/:id',
        component: AddUserComponent,
        data: {
          title: 'edit-customer'
        }
      }
      ,
      {
        path: 'all-customers',
        component: AllUsersComponent,
        data: {
          title: 'all-customers'
        }
      }
      ,
      {
        path: 'email-list',
        component: MailListComponent,
        data: {
          title: 'email-list'
        }
      }
    ]
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    data: {
      title: 'User Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
