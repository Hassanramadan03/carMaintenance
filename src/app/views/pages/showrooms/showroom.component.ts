import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagenation } from '../../../model/pagination';
import { BrandService } from '../../../service/brand.service';
import { CarBrand } from '../../../model/car-brand';
import { Image } from '../../../model/image';
import { GeneralResponse } from '../../../model/GeneralResponse';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-show-room',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})
export class ShowRoomComponent implements OnInit {

  brandForm: FormGroup;
  carBrand: CarBrand;
  imageEdit: String = null;
  brands: CarBrand[] = null;
  private base64textString: String = null;
  brandIamage: String = null;
  brandId: number;
  response: GeneralResponse;
  page: number = 1;
  totalCount: number;
  totalPages: number;
  editMode = false;
  pagenation: Pagenation;
  isValidImage: Boolean = null;




  modalRef: BsModalRef;




  constructor(private fb: FormBuilder, private brandService: BrandService, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService) { }

  ngOnInit() {

    this.pagenation = {
      "language": 1,
      "page": this.page,
      "noOfRows": 5
    }

    this.onLoadBrands(this.pagenation);

    this.brandForm = this.fb.group({
      brandId: [''],
      levelId: ['1'],
      brandNameEn: ['', [Validators.required]],
      brandNameAr: ['', [Validators.required]]
    });

  }


  onAddNewBrand() {

    this.carBrand = this.brandForm.value;
    this.carBrand.brandImage = this.base64textString;
    this.isValidImage = this.validateImage();
    if (this.isValidImage) {
      this.brandService.addBrand(this.carBrand).subscribe(data => {
        this.response = data;
        if (this.response.statusCode === 'OK') {
          this.onLoadBrands(this.pagenation);
          this.resetForm();
          this.onLoadBrands(this.pagenation);
        }
      });
    }
  }

  resetForm(): void {
    this.brandForm.setValue({

      brandId: '',
      brandNameEn: '',
      brandNameAr: '',
      levelId: '',
    });

    this.brandIamage = '';
    this.imageEdit = null;
    this.editMode = false;
    this.isValidImage = null;
  }


  // for some fo the fileds
  editForm(brandForm: CarBrand) {
    this.brandForm.patchValue({
      brandId: brandForm.brandId,
      brandNameEn: brandForm.brandNameEn,
      brandNameAr: brandForm.brandNameAr
    });
    this.imageEdit = brandForm.brandImage;
    this.brandId = brandForm.brandId;
    this.editMode = true;
  }
  onUpdateBrand() {
    this.carBrand = this.brandForm.value;
    this.carBrand.brandImage = this.base64textString;
    //this.news.coverImg = this.base64textString;
    this.brandService.updateBrand(this.carBrand).subscribe(data => {
      // console.log(this.itemDetail);
      console.log(data);
      //  this.onLoadBrands();
      this.onLoadBrands(this.pagenation);
      this.resetForm();

    });
    // this.onLoadBrands();
  }


  // delete Brand 


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(brandId): void {
    this.onDeleteBrand(brandId)
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  onDeleteBrand(brandId) {

    this.brandService.deleteBrand({
      "id": brandId
    }).subscribe(data => {
      this.onLoadBrands(this.pagenation);
    });
  }



  // delete image
  onDeleteImage(imageUrl) {

    console.log(imageUrl);
    this.brandService.deleteImage({ imagePath: imageUrl, bId: this.brandId }).subscribe(data => {
    });
    this.imageEdit = null;
  }

  //find all brands 

  onLoadBrands(pagenation) {
    this.brandService.getAllBrands(pagenation).subscribe(data => {
      this.response = data;
      if (this.response.statusCode === "OK") {
        this.brands = this.response.result;
        this.claculatePagination(this.response.totalCount);
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
    this.pagenation = {
      language: 1,
      page: this.page,
      noOfRows: 5
    }
    this.onLoadBrands(this.pagenation);
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