import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';

import { AllBlogs } from '../../../model/all-blogs';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';
import { CarRoutingModule } from '../car-routing.module';
import { Blogs } from '../../../model/blogs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CarDetails } from '../../../model/car-details';
import { CarService } from '../../../service/car.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss']
})
export class AllCarsComponent implements OnInit {
  pagenation: Pagenation;
  response: GeneralResponse;
  carlist: CarDetails[];
  editMode: false;
  car: CarDetails;
  private sub: any;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  deleteObj = null;
  modalRef: BsModalRef;
  searchArr: CarDetails[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private carService: CarService, private modalService: BsModalService) { }

  ngOnInit() {
    this.pagenation = {
      "language": 1,
      "page": 1,
      "noOfRows": 10
    }
    this.onLoadCars(this.pagenation);
  }


  onLoadCars(Pagenation) {
    this.carService.getAllCars(Pagenation).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.carlist = this.response.result;
        this.searchArr = this.response.result;
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
    this.onLoadCars(this.pagenation);
  }



  editForm(carId: number) {
    this.router.navigate(['../edit-car', carId], { relativeTo: this.route });
  }

  onAddNewCar() {
    this.router.navigate(['/cars/add-car']);
  }

  // delete

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(carId): void {
    this.onDeleteCar(carId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteCar(dbid) {
    console.log("I'm in function");
    console.log(dbid);

    this.deleteObj = {
      dbid: dbid
    }
    this.carService.deleteCar(this.deleteObj).subscribe(data => {
      this.deleteObj = null;
      this.onLoadCars(this.pagenation);
    });
  }



  onSearchChange(searchText: string) {


    if (searchText.trim() !== '') {

      var results = [];
      searchText = searchText.toLowerCase();
      for (var i = 0; i < this.carlist.length; i++) {
        if (this.carlist[i].carNameEn.toLowerCase().includes(searchText) ||
          this.carlist[i].carNameAr.toLowerCase().includes(searchText)) {
          results.push(this.carlist[i]);
        }
      }
      this.carlist = results;
    } else {
      this.carlist = this.searchArr;
    }
  }


}
