import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AddFaqComponent} from './add-faq/add-faq.component';
import {AllFaqsComponent} from './all-faqs/all-faqs.component';
import {FaqDetailsComponent} from './faq-details/faq-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'FAQs'
    },
    children: [
      {
        path: 'add-faqs',
        component: AddFaqComponent,
        data: {
          title: 'Add FAQs'
        }
      },{
        path: 'edit-faq/:id',
        component: AddFaqComponent,
        data: {
          title: 'edit-faq'
        }
      },
      {
        path: 'all-faqs',
        component: AllFaqsComponent,
        data: {
          title: 'All FAQs'
        }
      }
    ]
  },{
    path: 'faqs-details',
    component: FaqDetailsComponent,
    data: {
      title: 'FAQs Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQsRoutingModule {}
