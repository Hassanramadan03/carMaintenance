import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {Modelervice} from '../../../service/model.service';
import {BrandService} from '../../../service/brand.service';
import {CarModel} from '../../../model/car-model';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import {CarBrand} from '../../../model/car-brand';
import { AllModels } from '../../../model/all-models';
import { AllBrands } from '../../../model/all-brands';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Pagenation } from '../../../model/pagination';

@Component({
  selector: 'app-add-car-type',
  templateUrl: './add-car-type.component.html',
  styleUrls: ['./add-car-type.component.scss']
})
export class AddCarTypeComponent implements OnInit {

  brandForm: FormGroup;
  carBrand: CarBrand;
  imageEdit: String = null;
  brands:CarBrand[]= null;
  private base64textString:String=null;
  brandIamage: String=null;
  brandId: number;
  response: GeneralResponse;
  page:number = 1;
  totalCount:number;
  totalPages:number;
  editMode = false;
  pagenation:Pagenation;
  isValidImage:Boolean=null;

  modalRef: BsModalRef;
  activateBrand:Boolean = false;
  activateModel:Boolean = false;



  
 

  constructor(private fb: FormBuilder, private brandService: BrandService, private modelService: Modelervice, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService ) {}

  ngOnInit() {

    this.pagenation ={
      "language":1,
      "page":this.page,
      "noOfRows":5
    }

    var rqstObj = {
      "language":1,
  "page":this.page,
  "noOfRows":5,
  "typeId":2
    };
    this.onLoadModels(rqstObj);

    this.modelForm = this.fb.group({
      modelId:[''],
      modelNameEn:['',[Validators.required]],
      modelNameAr: ['',[Validators.required]],
      carBrandId: ['',[Validators.required]]
    });
       this.selectedBrandName = 'Please enter select brand';
     
  
    console.log('test');
this.brandForm = this.fb.group({
  brandId:[''],
  levelId :['1'],
  brandNameEn:['',[Validators.required]],
  brandNameAr: ['',[Validators.required]]
});
   
  }


onAddNewBrand(){
  console.log("I'm in function");
  this.carBrand = this.brandForm.value;
this.carBrand.typeId = 2;
this.brandService.addBrand(this.carBrand).subscribe(data=>{
 // console.log(this.itemDetail);
 this.response = data;
 if(this.response.statusCode==='OK'){
  console.log(data);
  this.resetForm();
 }
});

}

  resetForm(): void{
    this.brandForm.setValue({

      brandId :'',
      brandNameEn:'',
      brandNameAr:'',
      levelId:'',
    });

   this.brandIamage='';
   this.imageEdit = null;
   this.editMode = false;
   this.isValidImage=null;
  }
  


  modelForm: FormGroup;
  carModel: CarModel;
  models:CarModel[]= null;
  modelImage: String= null;
  modelId: number;
 
  modelsList:any;
  modelsListLength:number;
  selectedBrandName: String;
  allbrands:AllBrands={
    "language":1,
    "page":1,
    "noOfRows":100
  }

  allModels:AllModels={
    language:1,
    page : this.page,
    noOfRows: 5
  };


  addModel() {
     
this.modelForm = this.fb.group({
  modelId:[''],
  modelNameEn:['',[Validators.required]],
  modelNameAr: ['',[Validators.required]],
  carBrandId: ['',[Validators.required]]
});
   this.selectedBrandName = 'Please enter select brand';
 
  }



    
onAddNewModel(){
  console.log("I'm in function");
  this.carModel = this.modelForm.value;
  console.log(this.carModel); 
  
this.modelService.addModel({
	"carModel":
	{
		"modelImg":this.carModel.modelImg,
		"modelNameAr":this.modelForm.get('modelNameAr').value,
		"modelNameEn":this.modelForm.get('modelNameEn').value,
		"typeId":2
	},
		"carBrandId":this.modelForm.get('carBrandId').value
	
}).subscribe(data=>{
 // console.log(this.itemDetail);
  console.log(data);
  var rqstObj={
    language:1,
    page : 1,
    noOfRows: 5,
    typeId:2
  }
  this.onLoadModels(rqstObj);

});
this.resetModelForm();

}

  resetModelForm(): void{
    this.modelForm.setValue({
      modelId:'',
      modelNameEn:'',
      modelNameAr:'',
      carBrandId:''
    });

   this.modelImage='';
   this.imageEdit = null;
   this.editMode = false;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  confirm(modelId): void {
    
    this.onDeleteModel(modelId);
    this.modalRef.hide();
  }
  
  decline(): void {
    this.modalRef.hide();
  }
  
  
    onDeleteModel(modelId){
      console.log("I'm in function");
    this.modelService.deleteModel({
      "id":modelId
    }).subscribe(data=>{
      var rqstObj={
        language:1,
        page : this.page,
        noOfRows: 5,
        typeId:2
      }
      this.onLoadModels(rqstObj);
      this.modalRef.hide();
    });
    }
  
    onLoadBrands(){
     var rqstObj = {
        "language":1,
    "page":1,
    "noOfRows":5,
    "typeId":2
      };
      this.brandService.getAllBrands(rqstObj).subscribe(data=>{
        this.response = data;
        if(this.response.statusCode === "OK"){
          console.log("data back")
        this.brands = this.response.result;
        }else{
          console.log("error happend from backend");
        }
         console.log(data);
       });
    }


    onLoadModels(allModels){
      console.log(allModels);
      this.modelService.getAllModels(allModels).subscribe(data=>{
        this.response = data;
        console.log(this.response);
        if(this.response.statusCode === "OK"){
        this.modelsList = this.response.result;
        this.claculatePagination(this.response.totalCount);
        console.log(this.modelsListLength);
      
        }
         console.log(data);
       });
      }


      

claculatePagination(totalNumber: number){
  this.totalCount = totalNumber;
  if(this.totalCount >=1 && this.totalCount <5){
    this.totalPages = 1;
  }else if(this.totalCount % 5 !== 0){
    this.totalPages = (this.totalCount/5 )+ 1;
  }else{
  this.totalPages = this.totalCount/5;
  }
}

pageChanged( event: any ){
this.page = event;
var rqstObj={
  language:1,
  page : this.page,
  noOfRows: 5,
  typeId:2
}
this.onLoadModels(rqstObj);
}


onActivateBrand(){
  this.activateBrand = true;
  this.activateModel = false;
}

onActivateModel(){
  this.activateBrand = false;
  this.activateModel = true;
  this.onLoadBrands();
}

}
