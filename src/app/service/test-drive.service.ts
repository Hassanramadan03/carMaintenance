import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { News } from "../model/news";
import { AllNews } from "../model/all-news";
import { GlobalTokenService } from "./global-token.service";
//import {Image} from '../model/image';

@Injectable()
export class TestDriveService {
  total: number;
  checkOut: String;
  news: News;
  allNews: AllNews;
  constructor(private http: Http, private tokenService: GlobalTokenService) {}

  addTestDrive(id) {
    let header = new Headers();
    //  header.append('Content-Type','application/json');
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(id));

    return this.http
      .get("http://localhost:8080/findRequestTestDriveById/" + id, {
        headers: header
      })
      .map(res => res.json());
  }

  getAllTestDrive(pagenation) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(pagenation));

    return this.http
      .post("http://localhost:8081/listRequestTestDrive", pagenation, {
        headers: header
      })
      .map(res => res.json());
  }

  deleteTestDrive(dbid) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(dbid));

    return this.http
      .get("http://localhost:8080/deleteRequestTestDrive/" + dbid, {
        headers: header
      })
      .map(res => res.json());
  }

  readTestDrive(dbid) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + this.tokenService.getToken());
    console.log(JSON.stringify(dbid));

    return this.http
      .get("http://localhost:8080/readTestDrive/" + dbid, { headers: header })
      .map(res => res.json());
  }
}
