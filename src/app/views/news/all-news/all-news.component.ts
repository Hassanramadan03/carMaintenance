import { Component, OnInit , TemplateRef } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';
import { Faqs } from '../../../model/faq';
import { NewsService } from '../../../service/news.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { News } from '../../../model/news';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {


  news:News;
  newsList:News[];
  response: GeneralResponse;
  pagenation:Pagenation;
  adminForm: FormGroup;
  editMode=false;
  newsId: number;
  private sub: any;
  page:number = 1;
  totalCount:number;
  totalPages:number;
  deleteNews = null;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder,private newsService:NewsService,  private route: ActivatedRoute,
    private router: Router , private modalService: BsModalService) { }

  ngOnInit() {
    this.pagenation= {
      "language":1,
    "page":1,
    "noOfRows":10
    }
    this.onLoadNews(this.pagenation);
  }

  onLoadNews(pagenation){
    console.log(pagenation);
    this.newsService.getAllNews(pagenation).subscribe(data=>{
      this.response = data;
      console.log(this.response);
      if(this.response.statusCode === "OK"){
      this.newsList = this.response.result;
      this.claculatePagination(this.response.totalCount);
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
    this.onLoadNews(this.pagenation);
    }
    


    editForm(newsId: number){
      this.router.navigate(['../edit-news',  newsId],{ relativeTo: this.route });
    }

    onAddNewNews(){
      this.router.navigate(['news/add-news']);
    }

    // delete
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    
    confirm(newsId): void {
      this.modalRef.hide();
      this.onDeleteNews(newsId);
      
    }
    
    decline(): void {
      this.modalRef.hide();
    }
    


    onDeleteNews(faqId: number){
      this.modalRef.hide();
  this.deleteNews={
      faqId:faqId
          }

        this.newsService.deleteNews(this.deleteNews).subscribe(data =>{
      this.response = data;
        if(this.response.statusCode==='OK'){
        this.onLoadNews(this.pagenation);
          }
        });
    }

}