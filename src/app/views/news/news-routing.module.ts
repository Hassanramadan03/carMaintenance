import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AddNewsComponent} from './add-news/add-news.component';
import {AllNewsComponent} from './all-news/all-news.component';
import {NewsDetailsComponent} from './news-details/news-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'News'
    },
    children: [
      {
        path: 'add-news',
        component: AddNewsComponent,
        data: {
          title: 'news'
        }
      },
      {
        path: 'all-news',
        component: AllNewsComponent,
        data: {
          title: 'All News'
        }
      }
    ]
    
  }
  ,{
    path: 'news-details',
    component: NewsDetailsComponent,
    data: {
      title: 'news-details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
