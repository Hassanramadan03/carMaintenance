import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsComponent } from './contactus/contact-us.component';
import { RequestQouteComponent } from './requestqoute/request-qoute.component';
import { AuthGuard } from '../../auth.guard';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Requests'
    },
    children: [
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us'
        }
      },
      {
        path: 'request-qoute',
        component: RequestQouteComponent,
        data: {
          title: 'Request Qoute'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
