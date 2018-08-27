import { Component, OnInit, TemplateRef } from "@angular/core";
import { ContactUs } from "../../../model/contact-us";
import { GeneralResponse } from "../../../model/GeneralResponse";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute } from "@angular/router";
import { Pagenation } from "../../../model/pagination";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ContactUsService } from "../../../service/contact-us.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  constructor(
    private contactUsService: ContactUsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
  ) { }
  id: any;
  ngOnInit() {
    this.pagenation = {
      language: 1,
      page: 1,
      noOfRows: 10
    };
    this.findAllContactUsRequest(this.pagenation);
    this.findAllContactUsRequest(this.pagenation);
    this.id = setInterval(() => {
      this.findAllContactUsRequest(this.pagenation);
    }, 1800000);

  }

  ContactUsList: ContactUs[];
  response: GeneralResponse;
  pagenation: Pagenation;
  userId: number;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  modalRef: BsModalRef;

  findAllContactUsRequest(pagenation) {
  
    this.contactUsService.getAllContacts(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.ContactUsList = this.response.result;
        this.claculatePagination(this.response.totalCount);
        console.log(this.ContactUsList);
      }
      console.log(data);
    });
  }

  claculatePagination(totalNumber: number) {
    this.totalCount = totalNumber;
    if (this.totalCount >= 1 && this.totalCount < 10) {
      this.totalPages = 1;
    } else if (this.totalCount % 10 !== 0) {
      this.totalPages = this.totalCount / 10 + 1;
    } else {
      this.totalPages = this.totalCount / 10;
    }
  }

  pageChanged(event: any) {
    this.page = event;
    this.pagenation = {
      language: 1,
      page: this.page,
      noOfRows: 10
    };
    this.findAllContactUsRequest(this.pagenation);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(modelId): void {
    this.contactUsService.deleteContactById(modelId).subscribe((data)=>{
      
      if(data)this.findAllContactUsRequest(this.pagenation)
    });
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
