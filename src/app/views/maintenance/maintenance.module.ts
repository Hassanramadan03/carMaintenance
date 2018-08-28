// Angular
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AllMaintenancesComponent } from "./all-maintenances/all-maintenances.component";
import { MaintenanceDetailsComponent } from "./maintenance-details/maintenance-details.component";
import { MaintenanceRoutingModule } from "./maintenance-routing.module";
import { AddCarTypeComponent } from "./add-car-type/add-car-type.component";
import { AddMaintenanceTypeComponent } from "./add-maintenance-type/add-maintenance-type.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { AuthGuard } from "../../auth.guard";
import { AuthInterceptor } from "../../auth.interceptor ";
import { BrandService } from "../../service/brand.service";
import { Modelervice } from "../../service/model.service";
import { MaintenenaceService } from "../../service/maintenance.service";
import { UserCarService } from "../../service/usercar.service";
import { RequestTestDriveComponent } from "./request-test-drive/request-test-drive.component";
import { TestDriveService } from "../../service/test-drive.service";
import { ApiUrlService } from "../../service/api-url.service";

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MaintenanceRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AllMaintenancesComponent,
    MaintenanceDetailsComponent,
    AddCarTypeComponent,
    AddMaintenanceTypeComponent,
    RequestTestDriveComponent
  ],
  providers: [
    AuthGuard,
    BrandService,
    Modelervice,
    MaintenenaceService,
    UserCarService,
    TestDriveService,
    ApiUrlService
  ]
})
export class MaintenanceModule {}
