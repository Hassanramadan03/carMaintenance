import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Pagenation } from "../../../model/pagination";
import { BrandService } from "../../../service/brand.service";
import { MaintenanceType } from "../../../model/maintenance-type";
import { Image } from "../../../model/image";
import { GeneralResponse } from "../../../model/GeneralResponse";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { MaintenenaceService } from "../../../service/maintenance.service";

@Component({
  selector: "app-add-maintenance-type",
  templateUrl: "./add-maintenance-type.component.html",
  styleUrls: ["./add-maintenance-type.component.scss"]
})
export class AddMaintenanceTypeComponent implements OnInit {
  typeForm: FormGroup;
  maintenance: MaintenanceType;
  imageEdit: String = null;
  maintenances: MaintenanceType[] = null;
  private base64textString: String = null;
  serviceId: number;
  response: GeneralResponse;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  editMode = false;
  pagenation: Pagenation;
  isValidImage: Boolean = null;

  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private maintenenaceService: MaintenenaceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.pagenation = {
      language: 1,
      page: this.page,
      noOfRows: 5
    };

    this.onLoadTypes(this.pagenation);
    console.log("test");
    this.typeForm = this.fb.group({
      serviceId: [""],
      serviceTypeNameEn: ["", [Validators.required]],
      serviceTypeNameAr: ["", [Validators.required]]
    });
  }

  onAddNewType() {
    console.log("I'm in function");
    this.maintenance = this.typeForm.value;

    this.maintenenaceService.addType(this.maintenance).subscribe(data => {
      // console.log(this.itemDetail);
      this.response = data;
      if (this.response.statusCode === "OK") {
        console.log(data);
        this.onLoadTypes(this.pagenation);
        this.resetForm();
        this.onLoadTypes(this.pagenation);
      }
    });
  }

  resetForm(): void {
    this.typeForm.setValue({
      serviceId: "",
      serviceTypeNameEn: "",
      serviceTypeNameAr: ""
    });

    this.editMode = false;
  }

  // for some fo the fileds
  editForm(maintenanceForm: MaintenanceType) {
    this.typeForm.patchValue({
      serviceId: maintenanceForm.serviceId,
      serviceTypeNameEn: maintenanceForm.serviceTypeNameEn,
      serviceTypeNameAr: maintenanceForm.serviceTypeNameAr
    });
    this.serviceId = maintenanceForm.serviceId;
    this.editMode = true;
  }
  onUpdateType() {
    console.log("I'm in function");
    this.maintenance = this.typeForm.value;

    this.maintenenaceService.updateType(this.maintenance).subscribe(data => {
      // console.log(this.itemDetail);
      console.log(data);
      //  this.onLoadBrands();
      this.onLoadTypes(this.pagenation);
      this.resetForm();
    });
    // this.onLoadBrands();
    console.log("I've finished");
  }

  // delete Brand

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(serviceId): void {
    this.onDeleteType(serviceId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteType(serviceId) {
    console.log("I'm in function");

    this.maintenenaceService
      .deleteType({
        id: serviceId
      })
      .subscribe(data => {
        console.log(data);
        this.onLoadTypes(this.pagenation);
      });
  }

  //find all brands

  onLoadTypes(pagenation) {
    this.maintenenaceService.getAllTypes(pagenation).subscribe(data => {
      this.response = data;
      console.log(data);
      if (this.response.statusCode === "OK") {
        this.maintenances = this.response.result;
        console.log(this.response.totalCount);
        this.claculatePagination(this.response.totalCount);
        console.log(this.response.totalCount);
        console.log(this.response.totalCount);
        console.log(this.maintenances);
      }
      console.log(data);
    });
  }

  claculatePagination(totalNumber: number) {
    this.totalCount = totalNumber;
    if (this.totalCount >= 1 && this.totalCount < 5) {
      this.totalPages = 1;
    } else if (this.totalCount % 5 !== 0) {
      this.totalPages = this.totalCount / 5 + 1;
    } else {
      this.totalPages = this.totalCount / 5;
    }
  }

  pageChanged(event: any) {
    this.page = event;
    this.pagenation = {
      language: 1,
      page: this.page,
      noOfRows: 5
    };
    this.onLoadTypes(this.pagenation);
  }
}
