import { Component, OnInit, TemplateRef } from "@angular/core";
import { Maintenance } from "../../model/maintenance";
import { GeneralResponse } from "../../model/GeneralResponse";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute } from "@angular/router";
import { Pagenation } from "../../model/pagination";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { MaintenenaceService } from "../../service/maintenance.service";
import { UserCarService } from "../../service/usercar.service";
import { StatisticsService } from "../../service/statistics.service";
import { Statistics } from "../../model/statistics";

@Component({
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public brandPrimary = "#20a8d8";
  public brandSuccess = "#4dbd74";
  public brandInfo = "#63c2de";
  public brandWarning = "#f8cb00";
  public brandDanger = "#f86c6b";

  // dropdown buttons
  // public status: { isopen } = { isopen: false };
  // public toggleDropdown($event: MouseEvent): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.status.isopen = !this.status.isopen;
  // }

  // lineChart1

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenenaceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private userCarService: UserCarService,
    private statisticsService: StatisticsService
  ) { }
  id: any;
  ngOnInit() {
    this.statistics.totalCustomers = 0;
    this.statistics.totalMaintainceRequests = 0;
    this.statistics.totalTestDriveRequests = 0;
    this.pagenation = {
      language: 1,
      page: 1,
      noOfRows: 10
    };
    this.findAllMaintenanceRequest(this.pagenation);
    this.id = setInterval(() => {
      this.findAllMaintenanceRequest(this.pagenation);
    }, 1800000);

    this.getAllStatistics();
  }

  maintenance: Maintenance;
  maintenanceList: Maintenance[];
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
  statistics: any={};

  findAllMaintenanceRequest(pagenation) {
    console.log(pagenation);
    this.maintenanceService.getAllServices(pagenation).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if (this.response.statusCode === "OK") {
        this.maintenanceList = this.response.result;
        this.claculatePagination(this.response.totalCount);
        console.log(this.maintenanceList);
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
    this.findAllMaintenanceRequest(this.pagenation);
  }

  sendEmailForm(userId: number) {
    this.router.navigate(["../edit-admin", userId], { relativeTo: this.route });
  }

  // delete

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(modelId): void {
    this.onDeleteAdmin(modelId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteAdmin(userId: number) {
    // this.userService.deleteUser().subscribe(){
    // }
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getAllStatistics() {
    this.statisticsService.getStatistic().subscribe(data => {
      this.statistics = data;
      console.log(data);
    });
  }
}
