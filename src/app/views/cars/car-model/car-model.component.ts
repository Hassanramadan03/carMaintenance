import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Modelervice } from '../../../service/model.service';
import { BrandService } from '../../../service/brand.service';
import { CarModel } from '../../../model/car-model';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { CarBrand } from '../../../model/car-brand';
import { AllModels } from '../../../model/all-models';
import { AllBrands } from '../../../model/all-brands';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent implements OnInit {

  modelForm: FormGroup;
  carModel: CarModel;
  imageEdit: String = null;
  models: CarModel[] = null;
  private base64textString: String = null;
  modelImage: String = null;
  modelId: number;
  response: GeneralResponse;
  brands: CarBrand[];
  modelsList: any;
  modelsListLength: number;
  editMode = false;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  selectedBrandName: String;
  allbrands: AllBrands = {
    "language": 1,
    "page": 1,
    "noOfRows": 100
  }

  allModels: AllModels = {
    language: 1,
    page: this.page,
    noOfRows: 5
  };

  modalRef: BsModalRef;

  isValidImage: Boolean = null;
  constructor(private fb: FormBuilder, private modelService: Modelervice, private route: ActivatedRoute,
    private router: Router, private brandService: BrandService, private modalService: BsModalService) { }

  ngOnInit() {

    // this.onLoadModels();
    this.onLoadBrands();
    this.onLoadModels(this.allModels);
    this.modelForm = this.fb.group({
      modelId: [''],
      modelNameEn: ['', [Validators.required]],
      modelNameAr: ['', [Validators.required]],
      carBrandId: ['', [Validators.required]]
    });
    this.selectedBrandName = 'Please enter select brand';
  }


  onLoadModels(allModels) {
    this.modelService.getAllModels(allModels).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.modelsList = this.response.result;
        this.claculatePagination(this.response.totalCount);

      }
    });
  }

  onAddNewModel() {
    this.carModel = this.modelForm.value;
    this.carModel.modelImg = this.base64textString;
    this.isValidImage = this.validateImage();
    if (this.isValidImage) {

      this.modelService.addModel({
        "carModel":
        {
          "modelImg": this.carModel.modelImg,
          "modelNameAr": this.modelForm.get('modelNameAr').value,
          "modelNameEn": this.modelForm.get('modelNameEn').value

        },
        "carBrandId": this.modelForm.get('carBrandId').value

      }).subscribe(data => {

        this.onLoadModels(this.allModels);

      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.modelForm.setValue({
      modelId: '',
      modelNameEn: '',
      modelNameAr: '',
      carBrandId: ''
    });

    this.modelImage = '';
    this.imageEdit = null;
    this.editMode = false;
  }

  // for some fo the fileds
  editForm(modelForm: CarModel) {
    this.modelForm.patchValue({
      modelId: modelForm.modelId,
      modelNameEn: modelForm.modelNameEn,
      modelNameAr: modelForm.modelNameAr,
      carBrandId: modelForm.carBrandId
    });
    this.imageEdit = modelForm.modelImg;
    this.modelId = modelForm.modelId;
    this.editMode = true;
  }

  onUpdateModel() {
    this.carModel = this.modelForm.value;
    this.carModel.modelImg = this.base64textString;
    this.modelService.updateModel(
      {
        "carModel":
        {
          "modelId": this.modelForm.get('modelId').value,
          "modelImg": this.carModel.modelImg,
          "modelNameAr": this.modelForm.get('modelNameAr').value,
          "modelNameEn": this.modelForm.get('modelNameEn').value
        },
        "carBrandId": this.modelForm.get('carBrandId').value
      }).subscribe(data => {
        // console.log(this.itemDetail);
        //  this.onLoadBrands();
        this.onLoadModels(this.allModels);
        this.resetForm();

      });
    // this.onLoadBrands();
  }


  // delete Brand 


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(modelId): void {
    this.onDeleteModel(modelId);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }


  onDeleteModel(modelId) {
    this.modelService.deleteModel({
      "id": modelId
    }).subscribe(data => {
      this.onLoadModels(this.allModels);
    });
  }


  // delete image
  onDeleteImage(imageUrl) {

    console.log(imageUrl);
    this.modelService.deleteImage({ imagePath: imageUrl, bId: this.modelId }).subscribe(data => {
    });
    this.imageEdit = null;
  }

  //find all brands 


  onLoadBrands() {
    this.brandService.getAllBrands(this.allbrands).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.brands = this.response.result;
      }
    });
  }



  claculatePagination(totalNumber: number) {
    this.totalCount = totalNumber;
    if (this.totalCount >= 1 && this.totalCount < 5) {
      this.totalPages = 1;
    } else if (this.totalCount % 5 !== 0) {
      this.totalPages = (this.totalCount / 5) + 1;
    } else {
      this.totalPages = this.totalCount / 5;
    }
  }

  pageChanged(event: any) {
    this.page = event;
    this.allModels = {
      language: 1,
      page: this.page,
      noOfRows: 5
    }
    this.onLoadModels(this.allModels);
  }




  // image Handler


  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //  console.log(btoa(binaryString));
  }


  validateImage(): boolean {
    if (this.base64textString === null || this.base64textString.trim() === '') {

      return false;
    }
    return true;
  }
}
