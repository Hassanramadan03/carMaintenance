import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AddBlogComponent} from './add-blog/add-blog.component';
import {AllBlogsComponent} from './all-blogs/all-blogs.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blogs'
    },
    children: [
      {
        path: 'all-blogs',
        component: AllBlogsComponent,
        data: {
          title: 'Blogs'
        }
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
        data: {
          title: 'Add Blog'
        }
      },
      {
        path: 'edit-blog/:id',
        component: AddBlogComponent,
        data: {
          title: 'Edit Blog'
        }
      }
    ]
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent,
    data: {
      title: 'Blog Details'
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
