import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ServiceCenterComponent } from './sevicecenter/service-center.component';
import { AuthGuard } from '../../auth.guard';
import { ShowRoomComponent } from './showrooms/showroom.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About Us'
        }
      },
      {
        path: 'showrooms',
        component: ShowRoomComponent,
        data: {
          title: 'ShowRooms'
        }

      }
      ,
      {
        path: 'servicecenter',
        component: ServiceCenterComponent,
        data: {
          title: 'Service Centers'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
