import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AllMaintenancesComponent } from "./all-maintenances/all-maintenances.component";
import { MaintenanceDetailsComponent } from "./maintenance-details/maintenance-details.component";
import { AddCarTypeComponent } from "./add-car-type/add-car-type.component";
import { AddMaintenanceTypeComponent } from "./add-maintenance-type/add-maintenance-type.component";
import { RequestTestDriveComponent } from "./request-test-drive/request-test-drive.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "maintenance"
    },
    children: [
      {
        path: "requests",
        component: AllMaintenancesComponent,
        data: {
          title: "Maintenance Requests"
        }
      },
      {
        path: "maintenance-type",
        component: AddMaintenanceTypeComponent,
        data: {
          title: "Maintenance Type"
        }
      },
      {
        path: "car-type",
        component: AddCarTypeComponent,
        data: {
          title: "Car Type"
        }
      },
      {
        path: "test-drive",
        component: RequestTestDriveComponent,
        data: {
          title: "test drive"
        }
      }
    ]
  },
  {
    path: "maintenance-details",
    component: AllMaintenancesComponent,
    data: {
      title: "MaintenanceDetailsComponent"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
