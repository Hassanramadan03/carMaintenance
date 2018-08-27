import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'
import { UserSettingsComponent } from './user-settings/user-settings.component';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivateChild: [AuthGuard],
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        data: {
          title: 'my settings'
        }
      },
      {
        path: 'pages',
        loadChildren: './views/pages/pages.module#PagesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'request',
        loadChildren: './views/requests/requests.module#RequestModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'cars',
        loadChildren: './views/cars/car.module#CarModule',
        canActivate: [AuthGuard]
      }
      ,
      {
        path: 'users',
        loadChildren: './views/users/user.module#UsersModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'blogs',
        loadChildren: './views/blogs/blogs.module#BlogsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'faqs',
        loadChildren: './views/faqs/faqs.module#FAQsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'news',
        loadChildren: './views/news/news.module#NewsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'maintenance',
        loadChildren: './views/maintenance/maintenance.module#MaintenanceModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
