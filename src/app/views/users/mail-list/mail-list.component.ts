import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagenation } from '../../../model/pagination';
import { BrandService } from '../../../service/brand.service';
import { CarBrand } from '../../../model/car-brand';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { EmailService } from '../../../service/mails.service';
import { AdminEmail } from '../../../model/admin-emails';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {

  modalRef: BsModalRef;
  emailForm: FormGroup;
  emailModel: AdminEmail;
  emails: AdminEmail[];
  response: GeneralResponse;
  editMode = false;



  constructor(private fb: FormBuilder, private emailService: EmailService, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.editMode = false;
    this.onLoadEmails();

    this.emailForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]]
    });

  }






  onLoadEmails() {
    this.emailService.getAllEmails().subscribe(data => {
      this.response = data;
      if (this.response.statusCode === 'OK') {
        this.emails = this.response.result;
      }
    });
  };

  onAddNewEmail() {
    this.emailModel = this.emailForm.value;
    this.emailService.addEmail(this.emailModel.email).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === 'OK') {
        this.resetForm();
        this.onLoadEmails();
      }
    });
  }


  resetForm(): void {
    this.emailForm.setValue({
      id: '',
      email: ''
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(id): void {
    this.onDeleteEmail(id)
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }


  onDeleteEmail(id) {
    this.emailService.deleteEmail(id).subscribe(data => {
      if (this.response.statusCode === 'OK') {
        this.onLoadEmails();
      }
    });
  }

}
