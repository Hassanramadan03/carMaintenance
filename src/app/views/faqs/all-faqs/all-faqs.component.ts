import { Component, OnInit , TemplateRef } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';
import { Faqs } from '../../../model/faq';
import { FaqService } from '../../../service/faq.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-all-faqs',
  templateUrl: './all-faqs.component.html',
  styleUrls: ['./all-faqs.component.scss']
})
export class AllFaqsComponent implements OnInit {

  faq:Faqs;
  faqList:Faqs[];
  response: GeneralResponse;
  pagenation:Pagenation;
  adminForm: FormGroup;
  editMode=false;
  faqId: number;
  private sub: any;
  page:number = 1;
  totalCount:number;
  totalPages:number;
  deleteFaq = null;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder,private faqService:FaqService,  private route: ActivatedRoute,
    private router: Router , private modalService: BsModalService) { }

  ngOnInit() {
    this.pagenation= {
      "language":1,
    "page":1,
    "noOfRows":10
    }
    this.onLoadFaqs(this.pagenation);
  }

  onLoadFaqs(pagenation){
    console.log(pagenation);
    this.faqService.getAllFaqs(pagenation).subscribe(data=>{
      this.response = data;
      console.log(this.response);
      if(this.response.statusCode === "OK"){
      this.faqList = this.response.result;
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
    this.onLoadFaqs(this.pagenation);
    }
    


    editForm(faqId: number){
      this.router.navigate(['../edit-faq', faqId],{ relativeTo: this.route });
    }

    onAddNewFAQ(){
      this.router.navigate(['faqs/add-faqs']);
    }

    // delete
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    
    confirm(faqId): void {
      this.modalRef.hide();
      this.onDeleteFaq(faqId);
      
    }
    
    decline(): void {
      this.modalRef.hide();
    }
    


    onDeleteFaq(faqId: number){
      this.modalRef.hide();
  this.deleteFaq={
      faqId:faqId
          }

        this.faqService.deleteFaq(this.deleteFaq).subscribe(data =>{
      this.response = data;
        if(this.response.statusCode==='OK'){
        this.onLoadFaqs(this.pagenation);
          }
        });
    }

}
