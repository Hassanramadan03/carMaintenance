import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Blogs } from "../model/blogs";
import { AllBlogs } from "../model/all-blogs";
import { GlobalTokenService } from "./global-token.service";
//import {Image} from '../model/image';

@Injectable()
export class BlogsService {
  total: number;
  checkOut: String;
  blogs: Blogs;
  allBlogs: AllBlogs;
  constructor(private http: Http, private tokenService: GlobalTokenService) { }

  addBlogs(blogs) {
    let header = new Headers();
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/addBlog", blogs, { headers: header })
      .map(res => res.json());
  }

  getAllBlogs(pagenation) {
    let header = new Headers();
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://41.187.117.153:8080/listBlog", pagenation, { headers: header })
      .map(res => res.json());
  }

  updateBlogs(blogs) {
    let header = new Headers();
    console.log(JSON.stringify(blogs));
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(blogs.dbid + "   ****** I'm in update ");
    return this.http
      .post("http://41.187.117.153:8080/updateBlog", blogs, { headers: header })
      .map(res => res.json());
  }

  deleteBlogs(blog) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(blog));

    return this.http
      .post("http://41.187.117.153:8080/deleteBlog", blog, { headers: header })
      .map(res => res.json());
  }

  findBlogById(blogId: number) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(this.tokenService.getToken());
    return this.http
      .get("http://41.187.117.153:8080/findBlogById/" + blogId + "/1", {
        headers: header
      })
      .map(res => res.json());
  }
}
