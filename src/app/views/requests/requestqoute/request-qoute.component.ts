import { Component, OnInit, TemplateRef } from "@angular/core";
import { RequestQoute } from "../../../model/request-qoute";
import { GeneralResponse } from "../../../model/GeneralResponse";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute } from "@angular/router";
import { Pagenation } from "../../../model/pagination";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { RequestQouteService } from "../../../service/request-qoute.service";

@Component({
  selector: 'app-request-qoute',
  templateUrl: './request-qoute.component.html',
  styleUrls: ['./request-qoute.component.scss']
})
export class RequestQouteComponent implements OnInit {

  constructor(
    private requestQouteService: RequestQouteService,
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
    this.findAllRequestQoutes(this.pagenation);
    this.findAllRequestQoutes(this.pagenation);
    this.id = setInterval(() => {
      this.findAllRequestQoutes(this.pagenation);
    }, 1800000);

  }

  RequestQouteList: RequestQoute[];
  response: GeneralResponse;
  pagenation: Pagenation;
  userId: number;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  modalRef: BsModalRef;

  findAllRequestQoutes(pagenation) {
    this.requestQouteService.getAllRequestQoutes(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.RequestQouteList = this.response.result;
        this.claculatePagination(this.response.totalCount);
        console.log(this.RequestQouteList);
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
    this.findAllRequestQoutes(this.pagenation);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(modelId): void {
    console.log(modelId)
    this.requestQouteService.deleteRequestQouteById(modelId).subscribe((data) => {
      if (data)
        this.findAllRequestQoutes(this.pagenation);
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
