import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CarBrand } from '../../../model/car-brand';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CarService } from '../../../service/car.service';
import { CarDetails } from '../../../model/car-details';
import { AllCars } from '../../../model/all.cars';
import { Modelervice } from '../../../service/model.service';
import { AllModels } from '../../../model/all-models';
import { CarModel } from '../../../model/car-model';
import { Pagenation } from '../../../model/pagination';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {


  modalRef: any;
  carForm: FormGroup;
  carDetails: CarDetails
  imageEdit: String = null;
  internalImageEdit1: String = null;
  internalImageEdit2: String = null;
  internalImageEdit3: String = null;
  externalImageEdit1: String = null;
  externalImageEdit2: String = null;
  externalImageEdit3: String = null;
  models: CarModel[] = null;
  private base64textString: File = null;
  private internalImage1: File = null;
  private internalImage2: File = null;
  private internalImage3: File = null;
  private externalImage1: File = null;
  private externalImage2: File = null;
  private externalImage3: File = null;
  private carCatalog: File = null;
  mainPic: File = null;
  carId: number;
  response: GeneralResponse;
  carList: any;
  editMode = false;
  pagenation: Pagenation;
  modelsPagenation: Pagenation;
  //images vlidations
  carRequest = new FormData();
  car: CarDetails;
  upload: Boolean = false;

  isValidImage: Boolean = null;
  private sub: any;


  constructor(private fb: FormBuilder, private carService: CarService, private modelService: Modelervice, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.upload = false;
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.carId = +params['id']; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
        this.findCarById(this.carId);
      }
    });

    this.pagenation = {
      language: 1,
      page: 1,
      noOfRows: 10
    }
    this.carForm = this.fb.group({
      carId: [''],
      carNameEn: ['', [Validators.required]],
      carNameAr: ['', [Validators.required]],
      curbWeight: ['', [Validators.required]],
      engineCapacity: ['', [Validators.required]],
      fuelTankCapacity: ['', [Validators.required]],
      grossVehicleWeight: ['', [Validators.required]],
      groundClearance: ['', [Validators.required]],
      width: ['', [Validators.required]],
      height: ['', [Validators.required]],
      length: ['', [Validators.required]],
      maxPower: ['', [Validators.required]],
      maxTorque: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      trunkCapacity: ['', [Validators.required]],
      carModelId: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    this.onLoadCars();
    this.onLoadModels();

  }


  onLoadCars() {
    this.carService.getAllCars(this.pagenation).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.carList = this.response.result;
      }
    });

  }


  onLoadModels() {
    this.modelsPagenation = {
      language: 1,
      page: 1,
      noOfRows: 100
    }
    this.modelService.getAllModels(this.modelsPagenation).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.models = this.response.result;
      }
    });
  }

  onAddNewCar() {
    this.carDetails = this.carForm.value;
    this.isValidImage = this.validateImage();
    if (this.isValidImage) {
      this.upload = true;
      this.carRequest.append('carNameAr', this.carForm.get('carNameAr').value);
      this.carRequest.append('carNameEn', this.carForm.get('carNameEn').value);
      this.carRequest.append('curbWeight', this.carForm.get('curbWeight').value);
      this.carRequest.append('fuelTankCapacity', this.carForm.get('fuelTankCapacity').value);
      this.carRequest.append('grossVehicleWeight', this.carForm.get('grossVehicleWeight').value);
      this.carRequest.append('groundClearance', this.carForm.get('groundClearance').value);
      this.carRequest.append('height', this.carForm.get('height').value);
      this.carRequest.append('length', this.carForm.get('length').value);
      this.carRequest.append('width', this.carForm.get('width').value);
      this.carRequest.append('mainPic', this.mainPic);
      this.carRequest.append('maxPower', this.carForm.get('maxPower').value);
      this.carRequest.append('maxTorque', this.carForm.get('maxTorque').value);
      this.carRequest.append('transmission', this.carForm.get('transmission').value);
      this.carRequest.append('trunkCapacity', this.carForm.get('trunkCapacity').value);
      this.carRequest.append('engineCapacity', this.carForm.get('engineCapacity').value);
      this.carRequest.append('carModelId', this.carForm.get('carModelId').value);
      this.carRequest.append('carPrice', this.carForm.get('price').value);
      this.carRequest.append('internalImage1', this.internalImage1);
      this.carRequest.append('internalImage2', this.internalImage2);
      this.carRequest.append('internalImage3', this.internalImage3);
      this.carRequest.append('externalImage1', this.externalImage1);
      this.carRequest.append('externalImage2', this.externalImage2);
      this.carRequest.append('externalImage3', this.externalImage3);
      this.carRequest.append('carCatalog', this.carCatalog)




      this.carService.addCar(this.carRequest).subscribe(data => {
        // console.log(data);
        //this.onLoadCars();
        this.upload = false;
        this.resetForm();
        this.carRequest = new FormData();

        this.router.navigate(['/cars/car-details']);

      });

    }
  }

  resetForm(): void {
    this.carForm.setValue({
      carId: '',
      carNameEn: '',
      carNameAr: '',
      curbWeight: '',
      engineCapacity: '',
      fuelTankCapacity: '',
      grossVehicleWeight: '',
      groundClearance: '',
      width: '',
      height: '',
      length: '',
      maxPower: '',
      maxTorque: '',
      transmission: '',
      trunkCapacity: '',
      carModelId: '',
      price: ''

    });

    this.imageEdit = null;
    this.internalImageEdit1 = null;
    this.internalImageEdit2 = null;
    this.internalImageEdit3 = null;
    this.externalImageEdit1 = null;
    this.externalImageEdit2 = null;
    this.externalImageEdit3 = null;
    this.editMode = false;
    this.isValidImage = null;
  }
  //Delete
  onDeleteCar(carId) {
    this.carService.deleteCar({
      "id": carId
    }).subscribe(data => {
      this.onLoadCars();
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(brandId): void {
    this.onDeleteCar(brandId)
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }











  // for some fo the fileds
  editForm(carForm: CarDetails) {
    this.carForm.patchValue({
      carId: carForm.carId,
      carNameEn: carForm.carNameEn,
      carNameAr: carForm.carNameAr,
      price: carForm.carPrice,
      curbWeight: carForm.curbWeight,
      engineCapacity: carForm.engineCapacity,
      fuelTankCapacity: carForm.fuelTankCapacity,
      grossVehicleWeight: carForm.grossVehicleWeight,
      groundClearance: carForm.groundClearance,
      width: carForm.width,
      height: carForm.height,
      length: carForm.length,
      maxPower: carForm.maxPower,
      maxTorque: carForm.maxTorque,
      transmission: carForm.transmission,
      trunkCapacity: carForm.trunkCapacity,
      carModelId: carForm.carModel.id,
    });
    this.imageEdit = carForm.mainPic;
    // this.internalImageEdit1 = carForm.internalImage[0];
    // this.internalImageEdit2 = null;
    // this.internalImageEdit3 = null;
    // this.externalImageEdit1 = null;
    // this.externalImageEdit2 = null;
    // this.externalImageEdit3 = null;
    this.editMode = true;
  }


  onUpdateCar() {
    this.carDetails = this.carForm.value;


    this.carRequest.append('carId', this.carForm.get('carId').value);
    this.carRequest.append('carNameAr', this.carForm.get('carNameAr').value);
    this.carRequest.append('carNameEn', this.carForm.get('carNameEn').value);
    this.carRequest.append('curbWeight', this.carForm.get('curbWeight').value);
    this.carRequest.append('fuelTankCapacity', this.carForm.get('fuelTankCapacity').value);
    this.carRequest.append('grossVehicleWeight', this.carForm.get('grossVehicleWeight').value);
    this.carRequest.append('groundClearance', this.carForm.get('groundClearance').value);
    this.carRequest.append('height', this.carForm.get('height').value);
    this.carRequest.append('length', this.carForm.get('length').value);
    this.carRequest.append('width', this.carForm.get('width').value);
    if (this.mainPic) {
      this.carRequest.append('mainPic', this.mainPic);
    }
    this.carRequest.append('maxPower', this.carForm.get('maxPower').value);
    this.carRequest.append('maxTorque', this.carForm.get('maxTorque').value);
    this.carRequest.append('transmission', this.carForm.get('transmission').value);
    this.carRequest.append('trunkCapacity', this.carForm.get('trunkCapacity').value);
    this.carRequest.append('engineCapacity', this.carForm.get('engineCapacity').value);
    this.carRequest.append('carModelId', this.carForm.get('carModelId').value);
    this.carRequest.append('carPrice', this.carForm.get('price').value);
    if (this.internalImage1) {
      this.carRequest.append('internalImage1', this.internalImage1);
    }
    if (this.internalImage2) {
      this.carRequest.append('internalImage2', this.internalImage2);
    }
    if (this.internalImage3) {
      this.carRequest.append('internalImage3', this.internalImage3);
    }
    if (this.externalImage1) {
      this.carRequest.append('externalImage1', this.externalImage1);
    }
    if (this.externalImage2) {
      this.carRequest.append('externalImage2', this.externalImage2);
    }
    if (this.externalImage3) {
      this.carRequest.append('externalImage3', this.externalImage3);
    }
    if (this.carCatalog) {
      this.carRequest.append('carCatalog', this.carCatalog)
    }



    this.carService.updateCar(this.carRequest).subscribe(data => {
      // this.onLoadCars();
      this.resetForm();
      this.carRequest = new FormData();
      this.router.navigate(['/cars/car-details']);

    });

  }



  // delete image
  onDeleteImage(imageUrl) {

    // console.log(imageUrl);
    //   this.brandService.deleteImage({imagePath: imageUrl, bId: this.brandId}).subscribe(data=>{
    //     console.log(data);
    //   });
    //   this.imageEdit = null;
  }


  findCarById(carId) {
    this.carService.findCarById(carId).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === 'OK') {
        this.car = this.response.result;
        this.editForm(this.car);
      }
    });
  }







  // image Handler

  handleFileSelect(evt) {
    this.mainPic = <File>evt.target.files[0];
  }

  // handel internal images
  handleFileSelectInternal1(evt) {
    this.internalImage1 = <File>evt.target.files[0];
  }

  handleFileSelectInternal2(evt) {
    this.internalImage2 = <File>evt.target.files[0];
  }

  handleFileSelectInternal3(evt) {
    this.internalImage3 = <File>evt.target.files[0];
  }

  // handel external images

  handleFileSelectExernal1(evt) {
    this.externalImage1 = <File>evt.target.files[0];
  }

  handleFileSelectExernal2(evt) {
    this.externalImage2 = <File>evt.target.files[0];
  }

  handleFileSelectExernal3(evt) {
    this.externalImage3 = <File>evt.target.files[0];

  }

  handleFileSelectCarCatalog(evt) {
    this.carCatalog = <File>evt.target.files[0];
  }

  validateImage(): boolean {
    if (this.mainPic === null) {
      return false;
    }
    if (this.internalImage1 === null) {
      return false;
    }
    if (this.internalImage2 === null) {
      return false;
    }
    if (this.internalImage3 === null) {
      return false;
    }
    if (this.externalImage1 === null) {
      return false;
    }
    if (this.externalImage2 === null) {
      return false;
    }
    if (this.externalImage3 === null) {
      return false;
    }
    return true;
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}