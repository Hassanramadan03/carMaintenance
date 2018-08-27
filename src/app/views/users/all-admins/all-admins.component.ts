import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit {

  admin: User;
  adminList: User[];
  response: GeneralResponse;
  pagenation: Pagenation;
  adminForm: FormGroup;
  editMode = false;
  userId: number;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.pagenation = {
      "language": 1,
      "page": 1,
      "noOfRows": 10
    }
    this.onLoadAdmins(this.pagenation);
  }

  onLoadAdmins(pagenation) {
    console.log(pagenation);
    this.userService.getAllAdmins(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.adminList = this.response.result;
        this.claculatePagination(this.response.totalCount);
      }
      console.log(data);
    });
  }


  claculatePagination(totalNumber: number) {
    this.totalCount = totalNumber;
    if (this.totalCount >= 1 && this.totalCount < 10) {
      this.totalPages = 1;
    } else if (this.totalCount % 10 !== 0) {
      this.totalPages = (this.totalCount / 10) + 1;
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
    }
    this.onLoadAdmins(this.pagenation);
  }



  editForm(userId: number) {
    this.router.navigate(['../edit-admin', userId], { relativeTo: this.route });
  }




  // delete

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(modelId): void {
    this.onDeleteAdmin(modelId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }



  onDeleteAdmin(userId: number) {

    this.userService.deleteUser(userId).subscribe(data => {
      this.onLoadAdmins(this.pagenation);
    })

  }

  onAddNewAdmin() {

    this.router.navigate(['users/add-admin']);

  }


}
