
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../service/news.service';

import { News } from '../../../model/news';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { AllNews } from '../../../model/all-news';
import { Pagenation } from '../../../model/pagination';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})

export class AddNewsComponent implements OnInit {

  newsForm: FormGroup;
  news: News;
  imageEdit: String = null;
  private base64textString:String="";
  coverImage: String;
  brandId: number;
  response: GeneralResponse;
  newsRequest = new FormData();
  private timeLineImage:File= null;
  private thumbnailImage:File= null;
  private mainImage:File= null;
  public isValidImage ;

  pagenation:Pagenation={
    page : 1,
    noOfRows: 10,
    language:1
  };
  newslist:any;
  newsListLength;
  editMode = false;

  dbid:number;
  
  
  
  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private router: Router , private newsService:NewsService) {}

  ngOnInit() {
    
//    this.onLoadBrands();
this.newsForm = this.fb.group({
  dbid:[''],
  levelId:['1',[Validators.required]],
  title:['',[Validators.required]],
  description: ['',[Validators.required]],
  subDescription :['',[Validators.required]],
});

this.onLoadNews(this.pagenation);

   
  }


onAddNews(){
  console.log("I'm in function");
  this.news = this.newsForm.value;

  this.isValidImage=this.validateImage();
  console.log(this.isValidImage);
  if(this.isValidImage){

    this.newsRequest.append('title',this.newsForm.get('title').value);
    this.newsRequest.append('description',this.newsForm.get('description').value);
    this.newsRequest.append('subDescription',this.newsForm.get('subDescription').value);
    this.newsRequest.append('coverImg',this.mainImage);
    this.newsRequest.append('language','1');
  }
 // this.news.coverImg = this.base64textString;
  console.log(this.newsForm.get('title').value);
this.newsService.addNews(this.newsRequest).subscribe(data=>{
 // console.log(this.itemDetail);
  console.log(data);
  //  this.onLoadBrands();
  this.onLoadNews(this.pagenation);


});

this.resetForm();
// this.onLoadBrands();
console.log("I've finished");
}

onUpdateNews(){
  console.log("I'm in function");
  this.news = this.newsForm.value;
 //this.news.coverImg = this.base64textString;
  console.log(this.newsForm);
this.newsService.updateNews(this.news).subscribe(data=>{
 // console.log(this.itemDetail);
  console.log(data);
  //  this.onLoadBrands();
  this.onLoadNews(this.pagenation);
});
this.resetForm();
// this.onLoadBrands();
console.log("I've finished");
}

onDeleteNews(dbid){
  console.log("I'm in function");
this.newsService.deleteNews(dbid).subscribe(data=>{
  console.log(data);
  this.onLoadNews(this.pagenation);
  //  this.onLoadBrands();
});
}


  resetForm(): void{
    this.newsForm.setValue({
      dbid:'',
      levelId:'',
      title:'',
      description:'',
      subDescription:'',
    });

   this.coverImage='';
   this.imageEdit = null;
  }

  // for some fo the fileds
  editForm(newsForm : News){

    this.newsForm.patchValue({
      dbid:newsForm.dbid,
      levelId:newsForm.levelId,
      title: newsForm.title,
       description:newsForm.description,
       subDescription:newsForm.subDescription
    });
    //  this.imageEdit = brandForm.brandImg;
    //  this.brandId = brandForm.brandId;
     this.editMode = true;

  }


// // delete image
// onDeleteImage(imageUrl){
  
// console.log(imageUrl);
//   this.brandService.deleteImage({imagePath: imageUrl, bId: this.brandId}).subscribe(data=>{
//     console.log(data);
//   });
//   this.imageEdit = null;
// }

//find all brands 

// onLoadBrands(){
//   this.brandService.getAllBrands().subscribe(data=>{
//     this.response = data;
//     if(this.response.statusCode === "OK"){
//     this.newslist = this.response.result;
//     }
//      console.log(data);
//    });
// }






onLoadNews(allNews){
console.log(allNews);
this.newsService.getAllNews(allNews).subscribe(data=>{
  this.response = data;
  console.log(this.response);
  if(this.response.statusCode === "OK"){
  this.newslist = this.response.result;
  this.newsListLength = this.newslist.length;
  console.log(this.newsListLength);

  }
   console.log(data);
 });
}




// image Handler

handleFileSelectTimeLine(evt){
  this.timeLineImage = <File>evt.target.files[0];
}

handleFileSelectThumbnail(evt){
  this.thumbnailImage = <File>evt.target.files[0];
}

handleFileSelectMainImage(evt){
  this.mainImage = <File>evt.target.files[0];
}

validateImage():boolean{
  if(this.timeLineImage === null ){
    return false;
  }
  if(this.thumbnailImage === null ){
        return false;
      }
      if(this.mainImage === null ){
        return false;
      }
      return true;
    }

handleFileSelect(evt){
  var files = evt.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(file);
}
}

_handleReaderLoaded(readerEvt) {
 var binaryString = readerEvt.target.result;
        this.base64textString= btoa(binaryString);
      //  console.log(btoa(binaryString));
}


}





