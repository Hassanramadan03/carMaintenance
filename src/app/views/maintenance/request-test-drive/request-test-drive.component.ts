import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { UserCarService } from "../../../service/usercar.service";
import { MaintenenaceService } from "../../../service/maintenance.service";
import { TestDrive } from "../../../model/test-drive";
import { GeneralResponse } from "../../../model/GeneralResponse";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Pagenation } from "../../../model/pagination";
import { TestDriveService } from "../../../service/test-drive.service";

@Component({
  selector: "app-request-test-drive",
  templateUrl: "./request-test-drive.component.html",
  styleUrls: ["./request-test-drive.component.scss"]
})
export class RequestTestDriveComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private testDriveService: TestDriveService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private userCarService: UserCarService
  ) {}
  id: any;
  ngOnInit() {
    this.pagenation = {
      language: 1,
      page: 1,
      noOfRows: 10
    };

    this.findAllTestDriveRequest(this.pagenation);

    this.id = setInterval(() => {
      this.findAllTestDriveRequest(this.pagenation);
    }, 1800000);
  }

  testDrive: TestDrive;
  testDriveList: TestDrive[];
  response: GeneralResponse;
  pagenation: Pagenation;
  maintenanceForm: FormGroup;
  editMode = false;
  userId: number;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  modalRef: BsModalRef;

  findAllTestDriveRequest(pagenation) {
    console.log(pagenation);
    this.testDriveService.getAllTestDrive(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.testDriveList = this.response.result;
        this.claculatePagination(this.response.totalCount);
        console.log(this.testDriveList);
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
    this.findAllTestDriveRequest(this.pagenation);
  }

  sendEmailForm(userId: number) {
    this.router.navigate(["../edit-admin", userId], { relativeTo: this.route });
  }

  // delete

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(requestId): void {
    this.onDeleteTestDrive(requestId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteTestDrive(userId: number) {
    // this.userService.deleteUser().subscribe(){
    // }
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
