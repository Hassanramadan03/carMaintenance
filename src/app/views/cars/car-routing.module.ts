import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CarBrandComponent} from './car-brand/car-brand.component';
import {CarModelComponent} from './car-model/car-model.component';
import {CarDetailsComponent} from './car-details/car-details.component';
import { AuthGuard } from '../../auth.guard';
import { AllCarsComponent } from './all-cars/all-cars.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cars'
    },
    children: [
      {
        path: 'car-brands',
        component: CarBrandComponent,
        data: {
          title: 'Brands'
        }
      },
      {
        path: 'car-models',
        component: CarModelComponent,
        data: {
          title: 'Car Models'
        }
      },
      {
        path: 'car-details',
        component: AllCarsComponent,
        data: {
          title: 'Car Details'
        }
        
      }
      ,
      {
        path: 'add-car',
        component: CarDetailsComponent,
        data: {
          title: 'Car Details'
        }
      },
      {
        path: 'edit-car/:id',
        component: CarDetailsComponent,
        data: {
          title: 'Edit Car'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {}
