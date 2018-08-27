import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { News } from "../model/news";
import { AllNews } from "../model/all-news";
import { GlobalTokenService } from "./global-token.service";
//import {Image} from '../model/image';

@Injectable()
export class NewsService {
  total: number;
  checkOut: String;
  news: News;
  allNews: AllNews;
  constructor(private http: Http, private tokenService: GlobalTokenService) {}

  addNews(news) {
    let header = new Headers();
    //  header.append('Content-Type','application/json');
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(news));

    return this.http
      .post("http://localhost:8080/addNews", news, { headers: header })
      .map(res => res.json());
  }

  getAllNews(allNews) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(allNews));

    return this.http
      .post("http://localhost:8080/listNews", allNews, { headers: header })
      .map(res => res.json());
  }

  updateNews(news) {
    console.log(JSON.stringify(news));
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());

    return this.http
      .post("http://localhost:8080/updateNews", news, { headers: header })
      .map(res => res.json());
  }

  deleteNews(dbid) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(dbid));

    return this.http
      .post("http://localhost:8080/deleteNews", dbid, { headers: header })
      .map(res => res.json());
  }

  // deleteImage(image: Image){
  //     let header = new Headers();

  //     header.append('Content-Type','application/json');
  //     return this.http.post('http://localhost:8080/delete-image-brand',image,{headers: header})
  //     .map(res=> res.json());
  // }
}
