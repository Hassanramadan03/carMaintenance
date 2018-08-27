import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AuthGuard } from "../../auth.guard";
import { BrandService } from "../../service/brand.service";
import { MaintenenaceService } from "../../service/maintenance.service";
import { UserCarService } from "../../service/usercar.service";
import { Modelervice } from "../../service/model.service";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { StatisticsService } from "../../service/statistics.service";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [
    AuthGuard,
    BrandService,
    Modelervice,
    MaintenenaceService,
    UserCarService,
    StatisticsService
  ]
})
export class DashboardModule {}
