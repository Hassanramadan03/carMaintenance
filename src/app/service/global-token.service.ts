import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Blogs } from '../model/blogs';
import { AllBlogs } from '../model/all-blogs';
//import {Image} from '../model/image';

@Injectable()
export class GlobalTokenService{

    total:number;
    checkOut:String;
    blogs: Blogs;
    allBlogs:AllBlogs
    constructor(private http: Http) { }

token:String;

     getToken():String{
const user = JSON.parse(localStorage.getItem("geyushiUser"));
         this.token = user.token;
        return this.token;
     }   
}