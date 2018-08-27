import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { AllNews } from '../../../model/all-news';
import { FaqService } from '../../../service/faq.service';
import { Faqs } from '../../../model/faq';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private router: Router , private faqService:FaqService) {}


  faqForm: FormGroup;
  faqs: Faqs;
  imageEdit: String = null;
  private base64textString:String="";
  coverImage: String;
  response: GeneralResponse;
  editMode = false;
  private sub: any;
  faqId:number;



 
  
  
  
  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      if(params['id']){
      this.faqId = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.findFaqById(this.faqId);
      }
   });
    
//    this.onLoadBrands();
this.faqForm = this.fb.group({
  
  faqId:'',
  faqTitle: ['',[Validators.required]],
  faqDescription: ['',[Validators.required]],
  answer: ['',[Validators.required]]

});



   
  }


onAddFaq(){
  console.log("I'm in function");
  this.faqs = this.faqForm.value;
  console.log(this.faqForm);
this.faqService.addFaq(this.faqs).subscribe(data=>{
 this.response = data;
 if(this.response.statusCode === 'OK'){
  this.resetForm();
  this.router.navigate(['faqs/all-faqs']);
 }
  
});

}



  resetForm(): void{
    this.faqForm.setValue({
      faqId:'',
      faqTitle: '',
      faqDescription: '',
      answer: ''
    
    });
    this.editMode = false;
  }


  onUpdateFaq(){
    this.faqs = this.faqForm.value;
    this.faqService.updateFaq(this.faqs).subscribe(data=>{
      this.response = data;
      if(this.response.statusCode === 'OK'){
       this.resetForm();
       this.router.navigate(['faqs/all-faqs']);
      }
    });
  }
  

  findFaqById(faqId: number){
    this.faqService.findFaqById(faqId).subscribe(data=>{
      this.response = data;
      if(this.response.statusCode === 'OK'){
        console.log(this.response);
        this.faqs = this.response.result;
        console.log('#### $$$ #### '+this.faqs.answer);
        this.faqForm.setValue({
          faqId:this.faqs.faqId,
          faqTitle: this.faqs.faqTitle,
          faqDescription: this.faqs.faqDescription,
          answer: this.faqs.answer
        });
        this.editMode = true;
       }
    });
  }

}





