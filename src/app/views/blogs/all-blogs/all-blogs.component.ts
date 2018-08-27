import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';

import { AllBlogs } from '../../../model/all-blogs';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';
import { BlogRoutingModule } from '../blogs-routing.module';
import { Blogs } from '../../../model/blogs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {


 pagenation:Pagenation;
  response: GeneralResponse;
  blogslist:any;
  editMode : false;
  blog:Blogs;
  private sub: any;
  page:number = 1;
  totalCount:number;
  totalPages:number;
  deleteObj = null;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private router: Router , private blogsService:BlogsService, private modalService: BsModalService) {}

  ngOnInit() {
    this.pagenation= {
      "language":1,
    "page":1,
    "noOfRows":10
    }
    this.onLoadBlogs(this.pagenation);
  }


onLoadBlogs(Pagenation){
  console.log(Pagenation);
  this.blogsService.getAllBlogs(Pagenation).subscribe(data=>{
    this.response = data;
    console.log(this.response);
    if(this.response.statusCode === "OK"){
    this.blogslist = this.response.result;
    console.log(this.blogslist);
    }
     console.log(data);
   });
}


claculatePagination(totalNumber: number){
  this.totalCount = totalNumber;
  if(this.totalCount >=1 && this.totalCount <10){
    this.totalPages = 1;
  }else if(this.totalCount % 10 !== 0){
    this.totalPages = (this.totalCount/10 )+ 1;
  }else{
  this.totalPages = this.totalCount/10;
  }
}

pageChanged( event: any ){
this.page = event;
this.pagenation={
  language:1,
  page : this.page,
  noOfRows: 10
}
this.onLoadBlogs(this.pagenation);
}



editForm(blogId: number){
  this.router.navigate(['../edit-blog', blogId],{ relativeTo: this.route });
}

onAddNewBlog(){
  this.router.navigate(['blogs/add-blog']);
}

// delete

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}

confirm(modelId): void {
  this.onDeleteBlogs(modelId);
  this.modalRef.hide();
}

decline(): void {
  this.modalRef.hide();
}

onDeleteBlogs(dbid){
  console.log("I'm in function");
  console.log(dbid);
  
  this.deleteObj = {
    dbid: dbid
  }
  console.log(JSON.stringify(this.deleteObj));
  this.blogsService.deleteBlogs(this.deleteObj).subscribe(data=>{
  console.log(data);
  this.deleteObj = null;
  this.onLoadBlogs(this.pagenation);
  });
  }
       

}
