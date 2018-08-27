import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';

import { Blogs } from '../../../model/blogs';
import {Image} from '../../../model/image';
import {GeneralResponse} from '../../../model/GeneralResponse';
import { Pagenation } from '../../../model/pagination';



@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  blogsForm: FormGroup;
  blogs: Blogs;
  imageEdit: String = null;
  blogPic: File=null;
  coverImage: String;
  blogId: number;
  response: GeneralResponse;
  blogslist:Blogs[]= null;
  blogsListLength;
  editMode = false;
  pagenation:Pagenation;
  dbid:number;
  blogRequest = new FormData();
  isValidImage:Boolean=null;
  private sub: any;
  

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private router: Router , private blogsService:BlogsService) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if(params['id']){
      this.blogId = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.findBlogById(this.blogId);
      }
   });

    
//    this.onLoadBrands();
this.blogsForm = this.fb.group({
  dbid:[''],
  levelId:['1'],
  title:['',[Validators.required]],
  description: ['',[Validators.required]],
  subDescription :['',[Validators.required]]
});

   
  }
    

  onAddBlogs(){
    this.blogs = this.blogsForm.value;
  //  this.isValidImage=this.validateImage();
  this.blogRequest.append('title',this.blogsForm.get('title').value);
  this.blogRequest.append('description',this.blogsForm.get('description').value);
  this.blogRequest.append('subDescription',this.blogsForm.get('subDescription').value);
  if(this.blogPic !== null){
    this.blogRequest.append('coverImg',this.blogPic);
  }
  this.blogsService.addBlogs(this.blogRequest).subscribe(data=>{
    this.response = data;
    if(this.response.statusCode === 'OK'){
      this.resetForm();
      this.blogRequest=new FormData();
      this.blogPic = null;
      this.router.navigate(['blogs/all-blogs']); 
    }
  
  });
  console.log("I've finished");
  }    
    
    resetForm(): void{
      this.blogsForm.setValue({
        dbid:'',
        levelId:'',
        title:'',
        description:'',
        subDescription:'',
      });
    
     this.coverImage='';
     this.imageEdit = null;
     this.editMode = false;
     
    }
    
    
    editForm(blogsForm : Blogs){
    
      this.blogsForm.patchValue({
        dbid:blogsForm.dbid,
        levelId:blogsForm.levelId,
        title: blogsForm.title,
         description:blogsForm.description,
         subDescription:blogsForm.subDescription
      });
        this.imageEdit = blogsForm.coverImg;
      //  this.brandId = brandForm.brandId;
       this.editMode = true;
    
    }


    findBlogById(blogId:number){

      this.blogsService.findBlogById(blogId).subscribe(data=>{
        this.response = data;
        if(this.response.statusCode==='OK'){
this.blogs=this.response.result;
this.editForm(this.blogs);
        }
      });
      
    }


    onUpdateBlog(){
      //  this.isValidImage=this.validateImage();
      this.blogRequest.append('dbid',this.blogsForm.get('dbid').value);
console.log("################### > "+ this.blogsForm.get('dbid').value );
      this.blogRequest.append('title',this.blogsForm.get('title').value);
      this.blogRequest.append('description',this.blogsForm.get('description').value);
      this.blogRequest.append('subDescription',this.blogsForm.get('subDescription').value);
      if(this.blogPic !== null){
        this.blogRequest.append('image',this.blogPic);
      }
      this.blogsService.updateBlogs(this.blogRequest).subscribe(data=>{
        this.response = data;
        if(this.response.statusCode === 'OK'){
          this.resetForm();
          this.blogRequest=null;
          this.blogRequest=new FormData();
          this.blogPic = null;
          console.log("sent update");
          this.router.navigate(['blogs/all-blogs']); 
        }
      
      });
    }

// image Handler

addBlogImage(evt){
  this.blogPic = <File>evt.target.files[0];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
